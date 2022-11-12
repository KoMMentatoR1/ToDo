import { AuthAction, AuthState, AuthActionTypes } from "../../types/authTypes"

const initialState: AuthState = {
    isAuth: false,
    user: {
        token: "",
        user: {
            email: "",
            isActivated: false,
            id: -1
        }
    },
    success: false,
    isLoading: false,
    error: null
}

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionTypes.FETCH_AUTH:
            return {isLoading: true, error: null, success: false, isAuth: false, user: {token: "", user: { email: "", isActivated: false, id: -1 }}}
        case AuthActionTypes.FETCH_SWITCHPASSWORD:
            return {isLoading: true, error: null, success: false, isAuth: true, user: {...state.user}}
        case AuthActionTypes.FETCH_AUTH_SUCCESS:
            return {isLoading: false, error: null, success: false, isAuth: true, user: action.payload}
        case AuthActionTypes.FETCH_SWITCHPASSWORD_ERROR:
            return {isLoading: false, error: action.payload, success: false, isAuth: true, user: {...state.user}}
        case AuthActionTypes.FETCH_AUTH_ERROR:
            return {isLoading: false, error: action.payload, success: false, isAuth: false, user: {token: "", user: { email: "", isActivated: false, id: -1 }}}
        case AuthActionTypes.CLEAR_ERROR:
            return {...state, error: "" }
        case AuthActionTypes.SWITCH_SUCCESS:
            return {...state, success: action.payload }    
        default:
            return state
    }        
}