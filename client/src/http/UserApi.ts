import { AxiosResponse } from "axios";
import IAccount from "../types/models/IAccount";
import { $api } from "./axios.instance";
import IUser from "../types/models/IUser";

export class UserApi {

    static async forgotPassword(email: string): Promise<AxiosResponse> {
        const response = await $api.get(`/user/forgot-password/${email}`);
        return response;
    }

    static async changePassword(email: string, code: string, password: string, confirmPassword: string): Promise<AxiosResponse<IAccount>> {
        const response = await $api.post<IAccount>(`/user/change-password`, {
            email,
            code,
            password,
            confirmPassword,
        });
        return response;
    }

    static async search(s: string): Promise<AxiosResponse<IUser[]>> {
        const response = await $api.get<IUser[]>(`/user/search?s=${s}`);
        return response;
    }

}