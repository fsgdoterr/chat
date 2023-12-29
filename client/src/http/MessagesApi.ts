import { AxiosResponse } from "axios";
import IAccount from "../types/models/IAccount";
import { $api } from "./axios.instance";
import IUser from "../types/models/IUser";

export class MessagesApi {

    static async getLastMessage(chatId: string): Promise<AxiosResponse> {
        const response = await $api.get(`/message/chat/${chatId}`);
        return response;
    }
}