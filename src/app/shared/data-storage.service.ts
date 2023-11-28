import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map } from "rxjs";

@Injectable({providedIn: "root"})
export class DataStorageService {
    constructor(private httpClient: HttpClient, private recipeService: RecipeService){}

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
        this.httpClient.get<Recipe[]>(
            "https://ng-course-recipe-book-8989c-default-rtdb.firebaseio.com/recipes.json")
            .pipe(map(recipes=> {
                return recipes.map(recipe => {
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients: []};
                })
            }))
            .subscribe(recipes => {
                this.recipeService.setRecipes(recipes);
            })
    }
}