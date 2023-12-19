import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { exhaustMap, map, take, tap } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as RecipesActions from "../recipes/store/recipe.action";

@Injectable({providedIn: "root"})
export class DataStorageService {
    constructor(
        private httpClient: HttpClient, 
        private recipeService: RecipeService, 
        // private authService: AuthService, 
        private store: Store<fromApp.AppState>){}

    storeRecipes(){
        const recipes = this.recipeService.getRecipe();
        return this.httpClient.put(
            "https://ng-course-recipe-book-8989c-default-rtdb.firebaseio.com/recipes.json", recipes)
        .subscribe(
            response => {
                console.log(response);
            });
    }

    fetchRecipes(){
        return this.store.select('auth')
        .pipe(
            take(1), 
            map(authState=> {
                return authState.user
            }),
            exhaustMap(user => {
            return this.httpClient.get<Recipe[]>(
                "https://ng-course-recipe-book-8989c-default-rtdb.firebaseio.com/recipes.json"
                ).pipe(map(recipes=> {
                    return recipes.map(recipe => {
                        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients: []};
                    })
                }),
                tap(recipes=> {
                    // this.recipeService.setRecipes(recipes);
                    this.store.dispatch(new RecipesActions.SetRecipes(recipes));
                }))
        }), )
    }
}