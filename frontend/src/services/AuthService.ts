import $api, { API_URL } from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponce";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>("auth/login", {email, password})
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>("auth/registration", {email, password})
    }

    static async switchPassword(id: number, password: string, newPassword: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>("auth/switchPassword", {id, password, newPassword})
    }

    static async refresh(): Promise<AxiosResponse<AuthResponse>> {
        return  await $api.get<AuthResponse>(`${API_URL}auth/refresh`, {withCredentials: true})
    }

}