import { v4 } from 'uuid';
import userModel from '../models/user.model';
import mailService from './mail.service';
import { IUser } from '../interfaces/user.interfaces';
import { ApiError } from '../utils/api.error';
import { TIME } from '../utils/consts';
import bcrypt from 'bcrypt';
import { UserDTO } from '../dtos/user.dto';
import { UploadedFile } from 'express-fileupload';
import { Types } from 'mongoose';
import fileService from './file.service';


class UserService {

    async forgotPassword(email: string): Promise<boolean> {
        const forgotPasswordCode = v4();
        const forgotPasswordTime = new Date();

        const user = await userModel.findOneAndUpdate(
            {email}, 
            {
                forgotPasswordCode,
                forgotPasswordTime,
            }, 
            {new: true}
        );

        if(!user) return false;

        await mailService.sendChangePasswordCode(user.email, forgotPasswordCode);

        return true;
    }

    async changePassword(email: string, forgotPasswordCode: string, password: string): Promise<IUser> {
    
        const hashPassword = await bcrypt.hash(password, 5);

        const candidate = await userModel.findOneAndUpdate(
            {
                email,
                forgotPasswordCode,
                forgotPasswordTime: {$gte: new Date(Date.now() - 5 * TIME.MINUTE)},
            }, 
            { 
                password: hashPassword,
                forgotPasswordCode: null,
                forgotPasswordTime: null,
            }, 
            { new: true }
        );

        if(!candidate)
            throw ApiError.badRequest('Invalid email or code');

        const userDto = new UserDTO(candidate);

        return userDto.getDto();
    }

    async update(userId: Types.ObjectId, name: string, avatar: UploadedFile): Promise<IUser> {
    
        const candidate = await userModel.findByIdAndUpdate(
            userId,
            {name},
            {new: true}
        );

        if(!candidate)
            throw ApiError.badRequest('User not found');
    
        if(avatar) {
            if(candidate.avatar)
                fileService.removeAvatar(candidate.avatar);

            const avatarName = await fileService.uploadAvatar(avatar);
            candidate.avatar = avatarName;
            await candidate.save();
        }

        const userDto = new UserDTO(candidate);

        return userDto.getDto();
    }

}

export default new UserService();