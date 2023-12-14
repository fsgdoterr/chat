import { HydratedDocument, Model, Types } from "mongoose";
import { IAttachment } from "./attachment.interfaces";

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

export type MessageDocument = HydratedDocument<IRawMessage>;

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