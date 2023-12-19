import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as AuthAction from "./store/auth.action";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})

export class AuthComponent implements OnInit, OnDestroy{
    isLoginMode = true;
    authForm!: FormGroup;
    isLoading = false;
    error: string | null = '';

    private storeSub?: Subscription;

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode
    }

    constructor(
        // private authService: AuthService, 
        // private router: Router,
        private store: Store<fromApp.AppState>){}

    onSubmit(){

        if(!this.authForm.valid){
            return;
        }
            const email = this.authForm.value['email'];
            const password = this.authForm.value['password'];
            // let authObs!: Observable<AuthResponseData>;
            this.isLoading = true;

            if(this.isLoginMode){
                // authObs = this.authService.login(email,password)
                this.store.dispatch(new AuthAction.LoginStart({email: email, password: password}));        
            } else {
                // authObs = this.authService.signUp(email, password)
                this.store.dispatch(new AuthAction.SignupStart({email: email, password: password}));
            }

            // authObs.subscribe({
            //     next: 
            //     resData => 
            //     {console.log('resData',resData);
            //      this.isLoading = false;
            //      this.router.navigate(['./recipes'])
            //     },
            //     error: errorMessage => 
            //     {console.log('error',errorMessage); 
            //     this.error = errorMessage;
            //     this.isLoading = false}
            // });
           
            this.authForm.reset();
        
    }
    
    ngOnInit() {
        this.authForm = new FormGroup({   
            'email' : new FormControl(null, [Validators.required, Validators.email]),
            'password' : new FormControl(null, [Validators.required, Validators.minLength(6)])
        })
        this.storeSub = this.store.select('auth').subscribe({
            next:
            authState => {
                this.isLoading = authState.loading;
                this.error = authState.authError;
            },
            error: errorMessage => {
                console.log('error', errorMessage);
                this.error = errorMessage;
            }
        })
    }
    
    onCloseBox(){
        this.store.dispatch(new AuthAction.ClearError());
    }

    ngOnDestroy() {
        if(this.storeSub){
            this.storeSub.unsubscribe()
        }
    }
}