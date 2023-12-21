import { Injectable } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import *as RecipeActions from "./store/recipe.action";
import { Actions, ofType } from "@ngrx/effects";
import { take } from "rxjs";

@Injectable({providedIn: "root"})
export class RecipeResolverService   {
    constructor(
        // private dataStorageService: DataStorageService, 
        private recipeService: RecipeService,
        private store: Store<fromApp.AppState>,
        private actions$: Actions
        ){}

    resolve: ResolveFn<Recipe[]> = () => {
        const recipes = this.recipeService.getRecipe();
            // return this.dataStorageService.fetchRecipes();
            this.store.dispatch(new RecipeActions.FetchRecipes());
            return this.actions$.pipe(ofType(RecipeActions.SET_RECIPES), take(1))
      
      };    
    }