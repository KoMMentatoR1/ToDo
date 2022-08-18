import { IUser } from "../../types/aythTypes";

export interface AuthResponse{
    accessToken: string;
    refreshToken: string;
    user: IUser;
}