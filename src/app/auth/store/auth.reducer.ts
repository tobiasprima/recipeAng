import { User } from "../user.model";
import * as fromAuthAction from "./auth.action";

export interface AuthState {
    user: User | null;

}

const initialState: AuthState = {
    user: null
}

export function authReducer(state: AuthState, action : fromAuthAction.AuthAction){
    switch(action.type) {
        case fromAuthAction.LOGIN:
            const user= new User(action.payload?.email, action.payload?.userId, action.payload?.token, action.payload?.expirationDate )
            return {
                ...state,
                user: user
            }
        case fromAuthAction.LOGOUT:
            return {
                ...state,
                user: null
            }
        default:
            return state
    }
}