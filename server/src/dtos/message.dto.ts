import { Document, Types, model } from "mongoose";
import { IMessage, MessageDocument } from "../interfaces/message.interfaces";
import { AttachmentDocument, IAttachment, IRawAttachment } from "../interfaces/attachment.interfaces";
import { AttachmentDTO } from "./attachment.dto";

export class MessageDto {

    constructor(
        private readonly message: MessageDocument
    ) {}

    getDto(): IMessage {
        return {
            id: this.message._id,
            senderId: this.message.senderId,
            receiverId: this.message.receiverId,
            body: this.message.body,
            attachments: this.getAttachments(),
            viewed: this.message.viewed,
            createdAt: this.message.createdAt,
            updatedAt: this.message.updatedAt,
        }
    }

    getAttachments(): Types.ObjectId[] | IAttachment[] {
        const attachs = this.message.attachments;
        if(attachs.length) {
            if(attachs.some(elem => elem instanceof Document)) {
                return attachs.map(a => new AttachmentDTO(a as AttachmentDocument).getDto());
            }
            return attachs as Types.ObjectId[];
        }
        return [];
    }
    
}