import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AuthAction from "./auth.action";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean,
}

@Injectable()
export class AuthEffects{
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
                    const expirationDate = new Date(
                        new Date().getTime() + +resData.expiresIn * 1000
                    )
                    return new AuthAction.Login({
                            email: resData.email,
                            userId: resData.localId,
                            token: resData.idToken,
                            expirationDate: expirationDate
                        })
                }),
                catchError(error => {
                return of();
            })
            )
            }))
    )

    authSuccess$ = createEffect(()=>
    this.actions$.pipe(
        ofType(
            AuthAction.LOGIN
        ), tap(()=> {
            this.router.navigate(['/']);
        })), {dispatch: false}
     )

    constructor(private actions$: Actions, private http: HttpClient, private router: Router){}
}