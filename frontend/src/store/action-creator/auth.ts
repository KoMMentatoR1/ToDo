import {Dispatch} from "redux";
import { AuthAction, AuthActionTypes } from "../../types/authTypes";
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
        } catch (e: any) {
            dispatch({
                type: AuthActionTypes.FETCH_AUTH_ERROR,
                payload: e.response.data.message
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
            localStorage.removeItem("token")
            dispatch({
                type: AuthActionTypes.FETCH_AUTH_ERROR,
                payload: e.response.data.message
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
            dispatch({type: AuthActionTypes.SWITCH_SUCCESS, payload: true})      
        } catch (e: any) {
            dispatch({
                type: AuthActionTypes.FETCH_AUTH_ERROR,
                payload: e.response.data.message
            })
        }
    }
}

export const switchPassword = (id: number, password: string, newPassword: string) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({type: AuthActionTypes.FETCH_SWITCHPASSWORD})
            await AuthService.switchPassword(id, password, newPassword)
            dispatch({type: AuthActionTypes.SWITCH_SUCCESS, payload: true})            
        } catch (e: any) {
            dispatch({
                type: AuthActionTypes.FETCH_SWITCHPASSWORD_ERROR,
                payload: e.response.data.message
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
        } catch (e: any) {
            dispatch({
                type: AuthActionTypes.FETCH_AUTH_ERROR,
                payload: e.response.data.message
            })
        }
    }
}

export const newPass = (email: string, code: string, newPass: string) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({type: AuthActionTypes.FETCH_AUTH})
            const response = await axios.post(`${API_URL}auth/newPass`, {email, code, newPass})      
            dispatch({type: AuthActionTypes.FETCH_AUTH_SUCCESS, payload: {token: "", user: {...response.data}}})         
        } catch (e: any) {
            dispatch({
                type: AuthActionTypes.FETCH_AUTH_ERROR,
                payload: e.response.data.message
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
        } catch (e: any) {
            dispatch({
                type: AuthActionTypes.FETCH_AUTH_ERROR,
                payload: e.response.data.message
            })
        }
    }
}

export const clearErrorAuth = () => {
    return (dispatch: Dispatch<AuthAction>) => {
        dispatch({type: AuthActionTypes.CLEAR_ERROR})
    }
}

export const switchSuccess = (data: boolean) => {
    return (dispatch: Dispatch<AuthAction>) => {
        dispatch({type: AuthActionTypes.SWITCH_SUCCESS, payload: data})
    }
}