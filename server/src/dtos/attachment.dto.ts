import { AttachmentDocument, IAttachment } from "../interfaces/attachment.interfaces";

export class AttachmentDTO {

    constructor(
        private readonly attachment: AttachmentDocument
    ) {}

    getDto(): IAttachment {
        return {
            id: this.attachment._id,
            messageId: this.attachment.messageId,
            size: this.attachment.size,
            type: this.attachment.type,
            userId: this.attachment.userId,
            name: this.attachment.name,
            createdAt: this.attachment.createdAt,
            updatedAt: this.attachment.updatedAt,
        } as IAttachment
    }
    
}