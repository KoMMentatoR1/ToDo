import { AuthResponse } from '../models/response/AuthResponce';

export interface IUser {
	email: string;
	isActivated: boolean;
	id: number;
}

export interface AuthState {
	isAuth: boolean;
	user: AuthResponse;
	isLoading: boolean;
	error: null | string;
}

export enum AuthActionTypes {
	FETCH_AUTH = 'FETCH_USERS',
	FETCH_AUTH_SUCCESS = 'FETCH_USERS_SUCCESS',
	FETCH_AUTH_ERROR = 'FETCH_USERS_FETCH_USERS_ERROR',
	FETCH_SWITCHPASSWORD_ERROR = 'FETCH_SWITCHPASSWORD_ERROR',
	FETCH_SWITCHPASSWORD = 'FETCH_SWITCHPASSWORD',
}
interface FetchAuthAction {
	type: AuthActionTypes.FETCH_AUTH;
}

interface FetchSwitchPassword {
	type: AuthActionTypes.FETCH_SWITCHPASSWORD;
}
interface FetchAuthSuccessAction {
	type: AuthActionTypes.FETCH_AUTH_SUCCESS;
	payload: AuthResponse;
}

interface FetchSwitchPasswordErrorAction {
	type: AuthActionTypes.FETCH_SWITCHPASSWORD_ERROR;
	payload: string;
}

interface FetchAuthErrorAction {
	type: AuthActionTypes.FETCH_AUTH_ERROR;
	payload: string;
}

export type AuthAction =
	| FetchAuthAction
	| FetchAuthErrorAction
	| FetchAuthSuccessAction
	| FetchSwitchPasswordErrorAction
	| FetchSwitchPassword;
