import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "./auth.service";
import { Observable, map, take } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";

@Injectable({providedIn: "root"})
export class AuthGuard {

    constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>){}
    
    canActivate(
        route: ActivatedRouteSnapshot, router: RouterStateSnapshot
    ) : boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        return this.store.select('auth').
        pipe(
            take(1),
            map(authState => {
                return authState.user;
            }),
            map(user => {
            const isAuth = !!user;
            if(isAuth){
                return true;
            }
            return this.router.createUrlTree(['/auth']);
        }))
    }
}

export const authGuardGuard: CanActivateFn = (route, state) => {
    return inject(AuthGuard).canActivate(route, state);
}