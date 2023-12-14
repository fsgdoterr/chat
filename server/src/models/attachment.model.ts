import { Schema, model } from 'mongoose';
import { IAttachmentModel, IRawAttachment, IRawAttachmentMethods } from '../interfaces/attachment.interfaces';

const attachmentSchema = new Schema<IRawAttachment, IAttachmentModel, IRawAttachmentMethods>({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    messageId: {type: Schema.Types.ObjectId, ref: 'Message', required: true},
    name: {type: String, required: true},
    type: {type: String, required: true},
    size: {type: Number, required: true},
}, {
    versionKey: false,
    timestamps: true,
});

const attachmentModel = model<IRawAttachment, IAttachmentModel>('Attachment', attachmentSchema);

export default attachmentModel;