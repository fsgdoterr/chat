import IUser from "./IUser";

export default interface IAccount {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    chats: IUser[];
    createdAt: string;
    updatedAt: string;
}