import IAttachment from "./IAttachment";

export default interface IMessage {
    id: string;
    senderId: string;
    receiverId: string;
    body?: string;
    viewed: boolean;
    attachments: string[] | IAttachment[];
    createdAt: string;
    updatedAt: string;
}