import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as RecipesActions from "./recipe.action";
import { map, switchMap, withLatestFrom } from "rxjs";
import { Recipe } from "../recipe.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";

@Injectable()
export class RecipeEffects{
    fetchRecipes$ = createEffect(()=>
        this.actions$.pipe(
            ofType(RecipesActions.FETCH_RECIPES),
            switchMap(() => {
                return this.httpClient.get<Recipe[]>(
                    "https://ng-course-recipe-book-8989c-default-rtdb.firebaseio.com/recipes.json"
                    );
            }),
            map(recipes=> {
                return recipes.map(recipe => {
                    return {
                        ...recipe, 
                        ingredients: recipe.ingredients ? recipe.ingredients: []
                    };
                });
            }),
            map(recipes => {
                return new RecipesActions.SetRecipes(recipes);
            })
        ),
    )

    storeRecipes$ = createEffect(()=>
        this.actions$.pipe(
            ofType(RecipesActions.STORE_RECIPE),
            withLatestFrom(this.store.select('recipes')),
            switchMap(([actionsData ,recipeState])=> {
                return this.httpClient.put(
                    "https://ng-course-recipe-book-8989c-default-rtdb.firebaseio.com/recipes.json", recipeState.recipes)
            })
        ),{dispatch: false}
    )

    constructor(
        private actions$ : Actions,
        private httpClient: HttpClient,
        private store: Store<fromApp.AppState>
    ){}
}