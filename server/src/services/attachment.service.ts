import { UploadedFile } from "express-fileupload";
import { IAttachment } from "../interfaces/attachment.interfaces";
import fileService from "./file.service";
import { Types } from "mongoose";
import attachmentModel from "../models/attachment.model";
import { AttachmentDTO } from "../dtos/attachment.dto";

class AttachmentService {

    async create(
        attachment: UploadedFile, 
        userId: Types.ObjectId, 
        messageId: Types.ObjectId
    ): Promise<IAttachment> {
        const { mimetype, name, size } = attachment;
    
        let type = mimetype.split('/').shift();
        if(type !== 'video' && type !== 'image') type = 'document';

        const fileName = await fileService.uploadFile(attachment);

        const attach = await attachmentModel.create({
            userId,
            type,
            size,
            name: fileName,
            messageId,
        });

        const attachDto = new AttachmentDTO(attach);

        return attachDto.getDto();
    }

    async delete(attachmentId: Types.ObjectId | string): Promise<IAttachment | null> {
        
        const attach = await attachmentModel.findOneAndDelete({_id: attachmentId});

        if(!attach)
            return null;

        fileService.removeFile(attach.type, attach.name);


        return new AttachmentDTO(attach).getDto()
    }

}

export default new AttachmentService();