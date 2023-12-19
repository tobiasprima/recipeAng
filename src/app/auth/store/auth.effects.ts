import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AuthAction from "./auth.action";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Injectable, Type, signal } from "@angular/core";
import { Router } from "@angular/router";

export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean,
}

const handleAuthentication = (expiresIn: number, email: string, userId: string, token: string) => {
    const expirationDate = new Date(
        new Date().getTime() + expiresIn * 1000
    )
    return new AuthAction.AuthenticateSuccess({
            email: email,
            userId: userId,
            token: token,
            expirationDate: expirationDate
        })
};

const handleError = (errorRes: any) => {
    let errorMessage = 'An Unknown Error Occured';
                    if (!errorRes.error || !errorRes.error.error){
                        return of(new AuthAction.AuthenticateFail(errorMessage));
                    }
                    switch(errorRes.error.error.message){
                        case 'EMAIL_EXISTS':
                            errorMessage = 'This Email already exist.';
                            break;
                        case 'EMAIL_NOT_FOUND':
                            errorMessage = 'This Email does not exist.';
                            break;
                        case 'INVALID_LOGIN_CREDENTIALS':
                            errorMessage = 'Login Credentials Invalid.';
                            break;
                    }
                    return of(new AuthAction.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects{
    authSignup$ = createEffect(()=> 
        this.actions$.pipe(
            ofType(AuthAction.SIGNUP_START),
            switchMap((SignupAction: AuthAction.SignupStart) => {
                return this.http.post<AuthResponseData>(
                    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
                    {
                        email: SignupAction.payload.email,
                        password: SignupAction.payload.password,
                        returnSecureToken: true,
                    }
                ).pipe(
                    map(resData => {
                        return handleAuthentication(
                            +resData.expiresIn,
                            resData.email,
                            resData.localId,
                            resData.idToken
                        );
                    }),
                    catchError(errorRes => {
                        return handleError(errorRes);
                    })
                )
            })
        ),
    )

    authLogin$ = createEffect(()=>
        this.actions$.pipe(
            ofType(AuthAction.LOGIN_START),
            switchMap((authData: AuthAction.LoginStart) => {
                return this.http.post<AuthResponseData>
            ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
            {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true,
            }
            ).pipe(
                map(resData => {
                    return handleAuthentication(
                        +resData.expiresIn, 
                        resData.email, 
                        resData.localId, 
                        resData.idToken
                        )
                }),
                catchError(errorRes => {
                    return handleError(errorRes)
            })
            )
            }))
    )

    authRedirect$ = createEffect(()=>
    this.actions$.pipe(
        ofType(
            AuthAction.AUTHENTICATE_SUCCESS
        ), tap(()=> {
            this.router.navigate(['/']);
        })), {dispatch: false}
     )

    constructor(private actions$: Actions, private http: HttpClient, private router: Router){}
}