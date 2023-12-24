import axios, { AxiosRequestConfig } from "axios";
import IAccount from "../types/models/IAccount";


export const API_URL = 'http://localhost:5000/api/v1';

const axiosConfig: AxiosRequestConfig = {
    baseURL: API_URL,
    withCredentials: true,
}

export const $api = axios.create(axiosConfig);

$api.interceptors.request.use((config) => {

    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

    return config;
});

$api.interceptors.response.use((config) => {
    const accessToken = config.headers['access-token'];
    if(accessToken) localStorage.setItem('token', accessToken);

    return config;
}, async (err) => {
    const originalRequest = err.config;
    if(err.status === 401 && err.config && !err.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<IAccount>(`${API_URL}/auth/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.headers['access-token']);
            return $api.request(originalRequest);
        } catch(e) {
            console.log('Unauthorized');
        }
    } else {
        throw err;
    }
});