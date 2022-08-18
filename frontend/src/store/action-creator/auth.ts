import {Dispatch} from "redux";
import { AuthAction, AuthActionTypes, IUser } from "../../types/aythTypes";
import AuthService from "../../services/AuthService";
import axios from "axios";
import { AuthResponse } from "../../models/response/AuthResponce";
import { API_URL } from "../../http";

export const login = (email: string, password: string) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({type: AuthActionTypes.FETCH_AUTH})
            const response = await AuthService.login(email, password)            
            dispatch({type: AuthActionTypes.FETCH_AUTH_SUCCESS, payload: response.data})
        } catch (e) {
            dispatch({
                type: AuthActionTypes.FETCH_AUTH_ERROR,
                payload: 'Произошла ошибка при загрузке пользователей'
            })
        }
    }
}

export const cheackAuth = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try{
            dispatch({type: AuthActionTypes.FETCH_AUTH})
            const response = await axios.get<AuthResponse>(`${API_URL}user/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken)
            dispatch({type: AuthActionTypes.FETCH_AUTH_SUCCESS, payload: response.data})
        } catch(e: any) {
            dispatch({
                type: AuthActionTypes.FETCH_AUTH_ERROR,
                payload: e.response?.data?.message
            })
        }
    }
}

export const registration = (email: string, password: string) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({type: AuthActionTypes.FETCH_AUTH})
            const response = await AuthService.registration(email, password)            
            dispatch({type: AuthActionTypes.FETCH_AUTH_SUCCESS, payload: response.data})
        } catch (e) {
            dispatch({
                type: AuthActionTypes.FETCH_AUTH_ERROR,
                payload: 'Произошла ошибка при загрузке пользователей'
            })
        }
    }
}

export const logout = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({type: AuthActionTypes.FETCH_AUTH})
            await AuthService.logout()            
            dispatch({type: AuthActionTypes.FETCH_AUTH_SUCCESS, payload: {refreshToken: "", accessToken: "", user: {email: "", id: -1, isActivated: false}}})
        } catch (e) {
            dispatch({
                type: AuthActionTypes.FETCH_AUTH_ERROR,
                payload: 'Произошла ошибка при загрузке пользователей'
            })
        }
    }
}