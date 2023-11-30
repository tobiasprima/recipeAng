import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component ( {
    selector: 'app-header',
    templateUrl: './header.component.html'

})

export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated = false;
    private userSub!: Subscription;

    constructor(private dataStorage: DataStorageService, private authService: AuthService){}

    ngOnInit(): void {
        this.userSub = this.authService.user
        .subscribe(user => {
            // this.isAuthenticated = !user? false : true; Same expression as below
            this.isAuthenticated = !!user;
        })
    }

    onSaveData(){
        this.dataStorage.storeRecipes();
    }

    onFetchData(){
        this.dataStorage.fetchRecipes().subscribe();
    }

    onLogout(){
        this.authService.logout();
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
}