import { AuthResponse } from "../models/response/AuthResponce";

export interface IUser {
    email: string;
    isActivated: boolean;
    id: number ;
}

export interface AuthState {
    isAuth: boolean;
    user: AuthResponse;
    isLoading: boolean;
    error: null | string;
    success: boolean;
}

export enum AuthActionTypes {
    FETCH_AUTH = 'FETCH_USERS',
    FETCH_AUTH_SUCCESS = 'FETCH_USERS_SUCCESS',
    FETCH_AUTH_ERROR = 'FETCH_USERS_FETCH_USERS_ERROR',
    FETCH_SWITCHPASSWORD_ERROR = "FETCH_SWITCHPASSWORD_ERROR",
    FETCH_SWITCHPASSWORD = "FETCH_SWITCHPASSWORD",
    CLEAR_ERROR = "CLEAR_ERROR",
    SWITCH_SUCCESS = "SWITCH_SUCCESS",
}
interface FetchAuthAction {
    type: AuthActionTypes.FETCH_AUTH;
}

interface FetchSwitchPassword {
    type: AuthActionTypes.FETCH_SWITCHPASSWORD;
}
interface FetchAuthSuccessAction {
    type: AuthActionTypes.FETCH_AUTH_SUCCESS;
    payload: AuthResponse
}

interface FetchSwitchPasswordErrorAction {
    type: AuthActionTypes.FETCH_SWITCHPASSWORD_ERROR;
    payload: string
}

interface FetchAuthErrorAction {
    type: AuthActionTypes.FETCH_AUTH_ERROR;
    payload: string;
}

interface ClearError {
    type: AuthActionTypes.CLEAR_ERROR;
}

interface SwitchSuccess {
    type: AuthActionTypes.SWITCH_SUCCESS;
    payload: boolean;
}

export type AuthAction = ClearError | FetchAuthAction | SwitchSuccess | FetchAuthErrorAction | FetchAuthSuccessAction | FetchSwitchPasswordErrorAction | FetchSwitchPassword