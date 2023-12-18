import { User } from "../user.model";

export interface AuthState {
    user: User | null;

}

const initialState: AuthState = {
    user: null
}

export function authReducer(state, action){
    return state;
}