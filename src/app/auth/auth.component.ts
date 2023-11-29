import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})

export class AuthComponent implements OnInit{
    isLoginMode = true;


    constructor(){}
    authForm!: FormGroup;

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode
    }


    onSubmit(){
        
    }
    
    ngOnInit() {
        this.authForm = new FormGroup({   
            'email' : new FormControl(null, [Validators.required, Validators.email]),
            'password' : new FormControl(null, [Validators.required, Validators.minLength(6)])
        })
    }
    private initForm(){


      
    }
}