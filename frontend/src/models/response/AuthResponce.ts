import { IUser } from "../../types/authTypes";

export interface AuthResponse{
    token: string;
    user: IUser;
}