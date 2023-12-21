import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AuthAction from "./auth.action";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Injectable, Type, signal } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../user.model";
import { AuthService } from "../auth.service";

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
    const user = new User(email, userId, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    return new AuthAction.AuthenticateSuccess({
            email: email,
            userId: userId,
            token: token,
            expirationDate: expirationDate,
            redirect: true,
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
                    tap(resData => {
                        this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                    }),
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
                tap(resData => {
                    this.authService.setLogoutTimer(+resData.expiresIn *1000);
                }),
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

    autoLogin$ = createEffect(()=> 
        this.actions$.pipe(
            ofType(AuthAction.AUTO_LOGIN),
            map(()=> {   
                const userDataString = localStorage.getItem('userData') as string;
                const userData: {
                    email: string;
                    id: string;
                    _token: string;
                    _tokenExpirationDate: string;
                } = JSON.parse(userDataString);
                if(!userData){
                    return { type : 'DUMMY'};
                }
                const loadedUser = new User(
                    userData.email,
                    userData.id,
                    userData._token,
                    new Date(userData._tokenExpirationDate)
                );

                if(loadedUser.token){
                    const expirationDuration =
                    new Date(userData._tokenExpirationDate).getTime() -
                    new Date().getTime();
                    this.authService.setLogoutTimer(expirationDuration);
                    return new AuthAction.AuthenticateSuccess(
                            {
                                email: loadedUser.email,
                                userId: loadedUser.id,
                                token: loadedUser.token,
                                expirationDate: new Date(userData._tokenExpirationDate),
                                redirect: false,
                            }
                        )
                    
                    // this.autoLogout(expirationDuration);
                }
                return { type : 'DUMMY'};
            })
        )
    )

    authLogout$ = createEffect(()=>
        this.actions$.pipe(
            ofType(AuthAction.LOGOUT),
            tap(()=> {
                this.authService.clearLogoutTimer()
                localStorage.removeItem('userData');
                this.router.navigate(['/auth'])
            })),{dispatch: false}
    )

    authRedirect$ = createEffect(()=>
    this.actions$.pipe(
        ofType(
            AuthAction.AUTHENTICATE_SUCCESS
        ), tap((authSuccessActions: AuthAction.AuthenticateSuccess)=> {
            if(authSuccessActions.payload.redirect){
                this.router.navigate(['/']);
            }
        })), {dispatch: false}
     )

    constructor(
        private actions$: Actions, 
        private http: HttpClient, 
        private router: Router,
        private authService: AuthService){}
}