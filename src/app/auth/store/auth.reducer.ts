import { from } from "rxjs";
import { User } from "../user.model";
import * as fromAuthAction from "./auth.action";

export interface AuthState {
    user: User | null;
    authError: string | null;
    loading: boolean;
}

const initialState: AuthState = {
    user: null,
    authError: null,
    loading: false
}

export function authReducer(state: AuthState = initialState, action : fromAuthAction.AuthAction){
    switch(action.type) {
        case fromAuthAction.AUTHENTICATE_SUCCESS:
            const user= new User(
                action.payload?.email,
                action.payload?.userId, 
                action.payload?.token, 
                action.payload?.expirationDate )
            return {
                ...state,
                user: user,
                authError: null,
                login: false,
                loading: false,
            }
        case fromAuthAction.LOGOUT:
            return {
                ...state,
                user: null,
                loading: false,
            }
        case fromAuthAction.LOGIN_START:
        case fromAuthAction.SIGNUP_START:
            return{
                ...state,
                authError: null,
                loading: true,
            }
        case fromAuthAction.AUTHENTICATE_FAIL:
            return{
                ...state,
                user: null,
                authError: action.payload,
                login: false,
                loading: false,
            }
        case fromAuthAction.CLEAR_ERROR:
            return{
                ...state,
                authError: null,
            }
        default:
            return state
    }
}