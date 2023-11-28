import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { Observable, map, take } from "rxjs";
import { Recipe } from "./recipe.model";

@Injectable({providedIn: "root"})
export class RecipeResolverService{
    constructor(private dataStorageService: DataStorageService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]>{
        return this.dataStorageService.fetchRecipes();
    }
}