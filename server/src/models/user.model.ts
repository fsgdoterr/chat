import { Schema, model } from 'mongoose';
import { IRawUser, IRawUserMethods, IUserModel } from '../interfaces/user.interfaces';


const userSchema = new Schema<IRawUser, IUserModel, IRawUserMethods>({
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    forgotPasswordCode: String,
    forgotPasswordTime: Date,
    avatar: String,
    chats: [{type: Schema.Types.ObjectId, ref: 'User'}],
}, {
    versionKey: false,
    timestamps: true,
});

userSchema.method('getAvatarUrl', function getAvatarUrl() {
    if(!this.avatar) return;
    const url: URL = new URL(`/public/avatars/${this.avatar}`, process.env.API_URL);
    return url.href
})

const userModel = model<IRawUser, IUserModel>('User', userSchema);

export default userModel;