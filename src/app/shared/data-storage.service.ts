import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({providedIn: "root"})
export class DataStorageService {
    constructor(private httpClient: HttpClient, private recipeService: RecipeService){}

    storeRecipes(){
        const recipes = this.recipeService.getRecipe();
        return this.httpClient.put("https://ng-course-recipe-book-8989c-default-rtdb.firebaseio.com.json", recipes)
        .subscribe(
            response => {
                console.log(response)})
    }
}