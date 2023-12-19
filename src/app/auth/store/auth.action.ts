import { Action } from "@ngrx/store";

export const SIGNUP_START = 'SIGNUP_START';
export const LOGIN_START = 'LOGIN_START';
export const AUTHENTICATE_SUCCESS = 'LOGIN';
export const AUTHENTICATE_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';

export class SignupStart implements Action{
    readonly type = SIGNUP_START;
    constructor(
        public payload: {
            email: string,
            password: string,
        }
    ){}
}

export class AuthenticateSuccess implements Action{
    readonly type = AUTHENTICATE_SUCCESS;
    constructor(
        public payload:{
            email: string,
            userId: string,
            token: string,
            expirationDate: Date,
        }){}

} 

export class Logout implements Action{
    readonly type = LOGOUT;
}

export class LoginStart implements Action{
    readonly type = LOGIN_START;
    constructor(public payload:{
        email: string,
        password: string,
    }){}
}

export class AuthenticateFail implements Action{
    readonly type = AUTHENTICATE_FAIL;
    constructor(public payload: string){}
}

export type AuthAction = SignupStart | AuthenticateFail | Logout | LoginStart | AuthenticateSuccess;