import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";

interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
}

@Injectable({providedIn: "root"})
export class AuthService{

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
        .pipe(catchError(
            (errorRes) => {
                let errorMessage = 'An Unknown Error Occured';
                if (!errorRes.error || !errorRes.error.error){
                    return throwError(()=>errorMessage)
                }
                switch(errorRes.error.error.message){
                    case 'EMAIL_EXISTS':
                        errorMessage = 'This Email Already Exists';
                }
                return throwError(()=> errorMessage);
            }
        ),)
    }
}