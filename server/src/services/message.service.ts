import { UploadedFile } from "express-fileupload";
import { Types } from "mongoose";
import { ApiError } from "../utils/api.error";
import messageModel from "../models/message.model";
import attachmentService from "./attachment.service";
import { MessageDto } from "../dtos/message.dto";
import { IMessage, MessageDocumentWithAttachments } from "../interfaces/message.interfaces";
import userService from "./user.service";

class MessageService {

    async create(
        senderId: Types.ObjectId, 
        receiverId: Types.ObjectId, 
        body?: string, 
        attachments?: UploadedFile[]
    ): Promise<IMessage> {
        if(!body && !attachments)
            throw ApiError.badRequest('message cannot be empty');

        const message = await messageModel.create({
            senderId,
            receiverId,
            body
        });

        if(attachments) {
            let attachs = [];
            if(Array.isArray(attachments)) {
                attachs = await Promise.all(attachments.map(async (attach) => await attachmentService.create(attach, senderId, message._id)));
            } else {
                attachs.push(await attachmentService.create(attachments, senderId, message._id));
            }
            message.attachments = attachs.map(attach => new Types.ObjectId(attach.id));
            await message.save();
        }

        await userService.addLink(senderId, receiverId);

        await message.populate('attachments') as MessageDocumentWithAttachments;

        const messageDto = new MessageDto(message);

        return messageDto.getDto();
    }
    
    async getAll(
        userId: Types.ObjectId, 
        chatId: Types.ObjectId | string, 
        limit: number = 20, 
        offset: number = 0
    ): Promise<{messages: IMessage[], totalCount: number}> {

        const query = {
            $or: [
                {
                    senderId: userId, 
                    receiverId: chatId
                }, 
                {
                    senderId: chatId, 
                    receiverId: userId
                }
            ]  
        }
        
        const messages = await messageModel.find(query).limit(limit).skip(offset).sort({createdAt: -1}).populate('attachments') as MessageDocumentWithAttachments[];

        const totalCount = await messageModel.countDocuments(query);

        return {
            messages: messages.map(mess => new MessageDto(mess).getDto()),
            totalCount
        }

    }

    async delete(
        userId: Types.ObjectId, 
        messageId: Types.ObjectId | string
    ): Promise<IMessage> {

        const message = await messageModel.findOneAndDelete({
            _id: messageId,
            senderId: userId,
        });

        if(!message)
            throw ApiError.notFound();

        if(message.attachments.length)
            message.attachments.map(attach => attachmentService.delete(attach._id));

        return new MessageDto(message).getDto();
    }

    async getOne(
        userId: Types.ObjectId, 
        chatId: Types.ObjectId | string
    ): Promise<IMessage> {

        const lastMessage = await messageModel.find({
            $or: [
                {
                    senderId: userId, 
                    receiverId: chatId
                }, 
                {
                    senderId: chatId, 
                    receiverId: userId
                }
            ]
        }).limit(1).sort({createdAt: -1}).populate('attachments') as MessageDocumentWithAttachments[];

        if(!lastMessage.length) 
            throw ApiError.notFound();
        
        const messageDto = new MessageDto(lastMessage.pop()!);

        return messageDto.getDto();
    }

    async view(
        userId: Types.ObjectId, 
        messageId: Types.ObjectId | string
    ): Promise<IMessage> {

        const message = await messageModel.findOneAndUpdate({
            _id: messageId,
            receiverId: userId,
        }, {viewed: true}).populate('attachments') as MessageDocumentWithAttachments;

        return new MessageDto(message).getDto();
    }

}

export default new MessageService();