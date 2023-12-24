import { AxiosResponse } from "axios";
import IAccount from "../types/models/IAccount";
import { $api } from "./axios.instance";

export class AuthApi {

    static async signin(email: string, password: string): Promise<AxiosResponse<IAccount>> {
        const response = await $api.post<IAccount>('/auth/signin', {
            email, 
            password
        });
        return response;
    }

    static async signup(email: string, name: string, password: string, confirmPassword: string): Promise<AxiosResponse<IAccount>> {
        const response = await $api.post<IAccount>('/auth/signup', {
            email, 
            name,
            password,
            confirmPassword,
        });
        return response;
    }

    static async refresh(): Promise<AxiosResponse<IAccount>> {
        const response = await $api.get<IAccount>('/auth/refresh');
        return response;
    }

    static async logout(): Promise<AxiosResponse> {
        const response = await $api.delete('/auth/logout');
        return response;
    }

}