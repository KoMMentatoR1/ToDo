import { IUser } from "../../types/authTypes";

export interface AuthResponse{
    accessToken: string;
    refreshToken: string;
    user: IUser;
}