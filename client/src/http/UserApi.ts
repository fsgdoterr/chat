import { AxiosResponse } from "axios";
import IAccount from "../types/models/IAccount";
import { $api } from "./axios.instance";

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

}