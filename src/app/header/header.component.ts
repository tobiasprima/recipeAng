import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription, map } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as AuthAction from "../auth/store/auth.action";
import * as RecipesActions from "../recipes/store/recipe.action";

@Component ( {
    selector: 'app-header',
    templateUrl: './header.component.html'

})

export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated = false;
    private userSub!: Subscription;

    constructor(
        private dataStorage: DataStorageService, 
        private authService: AuthService,
        private store: Store<fromApp.AppState>){}

    ngOnInit(): void {
        this.userSub = this.store.select('auth')
        .pipe(
            map(authState => authState.user)
        )
        .subscribe(user => {
            // this.isAuthenticated = !user? false : true; Same expression as below
            this.isAuthenticated = !!user;
        })
    }

    onSaveData(){
        this.dataStorage.storeRecipes();
    }

    onFetchData(){
        // this.dataStorage.fetchRecipes().subscribe();
        this.store.dispatch(new RecipesActions.FetchRecipes());
    }

    onLogout(){
        this.store.dispatch(new AuthAction.Logout());
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
}