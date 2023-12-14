import { Schema, model } from 'mongoose';
import { IMessageModel, IRawMessage, IRawMessageMethods } from '../interfaces/message.interfaces';

const messageSchema = new Schema<IRawMessage, IMessageModel, IRawMessageMethods>({
    senderId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    receiverId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    body: String,
    viewed: {type: Boolean, default: false},
    attachments: [{type: Schema.Types.ObjectId, ref: 'Attachment', required: true}],
}, {
    versionKey: false,
    timestamps: true,
});

const messageModel = model<IRawMessage, IMessageModel>('Message', messageSchema);

export default messageModel;