import {Dispatch} from "redux";
import { AuthAction, AuthActionTypes, IUser } from "../../types/authTypes";
import AuthService from "../../services/AuthService";
import axios from "axios";
import { API_URL } from "../../http";

export const login = (email: string, password: string) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({type: AuthActionTypes.FETCH_AUTH})
            const response = await AuthService.login(email, password)
            localStorage.setItem('token', response.data.token)        
            dispatch({type: AuthActionTypes.FETCH_AUTH_SUCCESS, payload: response.data})
        } catch (e) {
            dispatch({
                type: AuthActionTypes.FETCH_AUTH_ERROR,
                payload: 'Неверные данные'
            })
        }
    }
}

export const cheackAuth = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try{
            dispatch({type: AuthActionTypes.FETCH_AUTH})
            const response = await AuthService.refresh()
            localStorage.setItem('token', response.data.token)
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
            localStorage.setItem('token', response.data.token)          
            dispatch({type: AuthActionTypes.FETCH_AUTH_SUCCESS, payload: response.data})
        } catch (e) {
            dispatch({
                type: AuthActionTypes.FETCH_AUTH_ERROR,
                payload: 'Произошла ошибка при регистрации'
            })
        }
    }
}

export const switchPassword = (id: number, password: string, newPassword: string) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({type: AuthActionTypes.FETCH_SWITCHPASSWORD})
            const response = await AuthService.switchPassword(id, password, newPassword)            
            dispatch({type: AuthActionTypes.FETCH_AUTH_SUCCESS, payload: response.data})
        } catch (e) {
            dispatch({
                type: AuthActionTypes.FETCH_SWITCHPASSWORD_ERROR,
                payload: 'Неверный старый пароль'
            })
        }
    }
}

export const forgotPassword = (email: string) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({type: AuthActionTypes.FETCH_AUTH})
            await axios.post(`${API_URL}auth/forgotPassword`, {email})
            dispatch({type: AuthActionTypes.FETCH_AUTH_SUCCESS, payload: {token: "", user: {email: "", id: -1, isActivated: false}}})         
        } catch (e) {
            dispatch({
                type: AuthActionTypes.FETCH_AUTH_ERROR,
                payload: 'Пользователь не существует'
            })
        }
    }
}

export const newPass = (email: string, code: string, newPass: string) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({type: AuthActionTypes.FETCH_AUTH})
            await axios.post(`${API_URL}auth/newPass`, {email, code, newPass})      
            dispatch({type: AuthActionTypes.FETCH_AUTH_SUCCESS, payload: {token: "", user: {email: "", id: -1, isActivated: false}}})         
        } catch (e) {
            dispatch({
                type: AuthActionTypes.FETCH_AUTH_ERROR,
                payload: 'Пользователь не существует'
            })
        }
    }
}

export const logout = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({type: AuthActionTypes.FETCH_AUTH})
            localStorage.removeItem('token')            
            dispatch({type: AuthActionTypes.FETCH_AUTH_SUCCESS, payload: {token: "", user: {email: "", id: -1, isActivated: false}}})
        } catch (e) {
            dispatch({
                type: AuthActionTypes.FETCH_AUTH_ERROR,
                payload: 'Произошла ошибка при выходе'
            })
        }
    }
}