import { HydratedDocument, Model, Types } from "mongoose";

export interface IRawToken {
    userId: Types.ObjectId;
    refreshToken: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IRawTokenMethods {}

export interface ITokenModel extends Model<IRawToken, {}, IRawTokenMethods> {}

export type TokenDocument = HydratedDocument<IRawToken>;

export interface IToken {}