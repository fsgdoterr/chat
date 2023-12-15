import { HydratedDocument, Model, Types } from "mongoose";

export interface IRawUser {
    email: string;
    name: string;
    password: string;
    avatar?: string;
    forgotPasswordCode?: string;
    forgotPasswordTime?: Date;
    chats: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

export interface IRawUserMethods {
    getAvatarUrl(): string | undefined;
}

export interface IUserModel extends Model<IRawUser, {}, IRawUserMethods> {}

export type UserDocumentWithoutChats = HydratedDocument<IRawUser, IRawUserMethods>;

export interface UserDocumentWithChats extends Omit<UserDocumentWithoutChats, 'chats'> {
    chats: UserDocumentWithoutChats[];
}

export type UserDocument = UserDocumentWithoutChats | UserDocumentWithChats;

export interface IUser {
    id: Types.ObjectId;
    email: string;
    name: string;
    avatar?: string;
    chats: Types.ObjectId[] | IPublicUser[];
    createdAt: Date;
    updatedAt: Date;
}

export interface IPublicUser {
    id: Types.ObjectId;
    name: string;
    avatar?: string;
}