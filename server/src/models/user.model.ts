import { Schema, model } from 'mongoose';
import { IRawUser, IRawUserMethods, IUserModel } from '../interfaces/user.interfaces';

const userSchema = new Schema<IRawUser, IUserModel, IRawUserMethods>({
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    avatar: String,
    chats: [{type: Schema.Types.ObjectId, ref: 'User'}],
}, {
    versionKey: false,
    timestamps: true,
});

const userModel = model<IRawUser, IUserModel>('User', userSchema);

export default userModel;