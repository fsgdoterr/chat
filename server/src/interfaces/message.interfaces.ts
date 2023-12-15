import { Document, HydratedDocument, Model, ObjectId, PopulatedDoc, Types } from "mongoose";
import { AttachmentDocument, IAttachment, IRawAttachment } from "./attachment.interfaces";

export interface IRawMessage {
    senderId: Types.ObjectId;
    receiverId: Types.ObjectId;
    body?: string;
    viewed: boolean;
    attachments: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

export interface IRawMessageMethods {}

export interface IMessageModel extends Model<IRawMessage, {}, IRawMessageMethods> {}

export type MessageDocumentWithoutAttachments = HydratedDocument<IRawMessage, {}, IRawMessageMethods>;

export interface MessageDocumentWithAttachments extends Omit<MessageDocumentWithoutAttachments, 'attachments'> {
    attachments: AttachmentDocument[];
}

export type MessageDocument = MessageDocumentWithoutAttachments | MessageDocumentWithAttachments;

export interface IMessage {
    id: Types.ObjectId;
    senderId: Types.ObjectId;
    receiverId: Types.ObjectId;
    body?: string;
    viewed: boolean;
    attachments: Types.ObjectId[] | IAttachment[];
    createdAt: Date;
    updatedAt: Date;
}