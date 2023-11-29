import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, catchError, throwError, tap } from "rxjs";
import { User } from "./user.model";

export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean,
}

@Injectable({providedIn: "root"})
export class AuthService{
    user = new Subject<User>();

    constructor(private http: HttpClient){}

    signUp(email: string, password: string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBD34rWC15zWVIg9DNp9LXJvm8dlSERHLk',
            {
                email: email,
                password: password,
                returnSecureToken: true,
            }
        )
        .pipe(catchError(this.handleError), tap(resData => {
            const expirationDate = new Date(new Date().getTime()+ +resData.expiresIn * 1000);
            const user = new User(resData.email, resData.localId, resData.idToken, expirationDate );
            this.user.next(user)
        }))
    }

    login(email: string, password: string){
       return this.http.post<AuthResponseData>
        ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBD34rWC15zWVIg9DNp9LXJvm8dlSERHLk',
        {
            email: email,
            password: password,
            returnSecureToken: true,
        })
        .pipe(catchError(this.handleError))
    }


    private handleError(errorRes: HttpErrorResponse){
        let errorMessage = 'An Unknown Error Occured';
        console.log(errorRes);
                if (!errorRes.error || !errorRes.error.error){
                    return throwError(()=>errorMessage)
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
                return throwError(()=> errorMessage);
            }
    }