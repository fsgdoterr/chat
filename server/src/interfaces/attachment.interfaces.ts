import { HydratedDocument, Model, Types } from "mongoose";

export interface IRawAttachment {
    userId: Types.ObjectId;
    messageId: Types.ObjectId;
    name: string;
    type: string;
    size: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface IRawAttachmentMethods {}

export interface IAttachmentModel extends Model<IRawAttachment, {}, IRawAttachmentMethods> {}

export type AttachmentDocument = HydratedDocument<IRawAttachment>;

export interface IAttachment {
    id: Types.ObjectId;
    userId: Types.ObjectId;
    messageId: Types.ObjectId;
    name: string;
    type: string;
    size: number;
    createdAt: Date;
    updatedAt: Date;
}