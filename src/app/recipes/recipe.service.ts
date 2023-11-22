import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";

@Injectable()

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('A Test Recipe', 'This is a test', 'https://img.taste.com.au/h2qVkJjl/taste/2021/09/air-fryer-chicken-rissoles-recipe-173558-1.jpg'),
        new Recipe('Another Test Recipe', 'This is a test', 'https://img.taste.com.au/h2qVkJjl/taste/2021/09/air-fryer-chicken-rissoles-recipe-173558-1.jpg'),
      ];
    
      getRecipe(){
        return this.recipes.slice();
      }
}