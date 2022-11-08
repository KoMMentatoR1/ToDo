import { AuthAction, AuthState, AuthActionTypes } from "../../types/authTypes"

const initialState: AuthState = {
    isAuth: false,
    user: {
        refreshToken: "",
        accessToken: "",
        user: {
            email: "",
            isActivated: false,
            id: -1
        }
    },
    isLoading: false,
    error: null
}

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionTypes.FETCH_AUTH:
            return {isLoading: true, error: null, isAuth: false, user: {refreshToken: "", accessToken: "", user: { email: "", isActivated: false, id: -1 }}}
        case AuthActionTypes.FETCH_SWITCHPASSWORD:
            return {isLoading: true, error: null, isAuth: true, user: {...state.user}}
        case AuthActionTypes.FETCH_AUTH_SUCCESS:
            return {isLoading: false, error: null, isAuth: true, user: action.payload}
        case AuthActionTypes.FETCH_SWITCHPASSWORD_ERROR:
            return {isLoading: false, error: action.payload, isAuth: true, user: {...state.user}}
        case AuthActionTypes.FETCH_AUTH_ERROR:
            return {isLoading: false, error: action.payload, isAuth: false, user: {refreshToken: "", accessToken: "", user: { email: "", isActivated: false, id: -1 }}}
        default:
            return state
    }        
}