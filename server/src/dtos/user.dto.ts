import { Document, Types } from "mongoose";
import { IPublicUser, IUser, UserDocument } from "../interfaces/user.interfaces";

export class UserDTO {

    constructor(
        private readonly user: UserDocument
    ) {}

    getDto(): IUser {
        return {
            id: this.user._id,
            email: this.user.email,
            name: this.user.name,
            avatar: this.user.getAvatarUrl(),
            chats: this.getChats(),
            createdAt: this.user.createdAt,
            updatedAt: this.user.updatedAt,
        }
    }

    getPublicDto(): IPublicUser {
        return {
            id: this.user._id,
            name: this.user.name,
            avatar: this.user.getAvatarUrl(),
        }
    }

    getChats(): Types.ObjectId[] | IPublicUser[] {
        const chats = this.user.chats;
        if(chats.length) {
            if(chats.some(elem => elem instanceof Document)) {
                return chats.map(chat => new UserDTO(chat as UserDocument).getPublicDto());
            }
            return chats as Types.ObjectId[];
        }
        return [];
    }
    
}