import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})

export class AuthComponent implements OnInit{
    isLoginMode = true;
    authForm!: FormGroup;
    isLoading = false;
    error: string = '';

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode
    }

    constructor(private authService: AuthService){}

    onSubmit(){

        if(!this.authForm.valid){
            return;
        }
            const email = this.authForm.value['email'];
            const password = this.authForm.value['password'];
            this.isLoading = true;

            if(this.isLoginMode){

            } else {
                this.authService.signUp(email, password)
                .subscribe({
                    next: 
                    resData => 
                    {console.log('resData',resData), this.isLoading = false},
                    error: errorMessage => 
                    {console.log('error',errorMessage); 
                    this.error = errorMessage;
                    this.isLoading = false}
                });
            }
           
            this.authForm.reset();
        
    }
    
    ngOnInit() {

        this.authForm = new FormGroup({   
            'email' : new FormControl(null, [Validators.required, Validators.email]),
            'password' : new FormControl(null, [Validators.required, Validators.minLength(6)])
        })
      
        
    }
}