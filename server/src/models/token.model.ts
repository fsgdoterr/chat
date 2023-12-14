import { Schema, model } from 'mongoose';
import { IRawToken, IRawTokenMethods, ITokenModel } from '../interfaces/token.interfaces';

const tokenSchema = new Schema<IRawToken, ITokenModel, IRawTokenMethods>({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    refreshToken: {type: String, required: true},
}, {
    versionKey: false,
    timestamps: true,
});

const tokenModel = model<IRawToken, ITokenModel>('Token', tokenSchema);

export default tokenModel;