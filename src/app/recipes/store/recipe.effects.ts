import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as RecipesActions from "./recipe.action";
import { map, switchMap } from "rxjs";
import { Recipe } from "../recipe.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

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

    constructor(
        private actions$ : Actions,
        private httpClient: HttpClient
    ){}
}