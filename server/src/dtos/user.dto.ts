import { IUser, UserDocument } from "../interfaces/user.interfaces";

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
            chats: this.user.chats,
            createdAt: this.user.createdAt,
            updatedAt: this.user.updatedAt,
        }
    }
    
}