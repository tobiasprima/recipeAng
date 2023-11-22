import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";

@Injectable()

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
          'A Test Recipe', 
          'This is a test', 
          'https://img.taste.com.au/h2qVkJjl/taste/2021/09/air-fryer-chicken-rissoles-recipe-173558-1.jpg',
          [
            new Ingredient('Meat', 1),
            new Ingredient('French Fries', 1)
          ]),
        new Recipe(
          'Another Test Recipe', 
          'This is a test', 
          'https://img.taste.com.au/h2qVkJjl/taste/2021/09/air-fryer-chicken-rissoles-recipe-173558-1.jpg',
          [
            new Ingredient('Buns', 2),
            new Ingredient('Meat', 5),
          ]),
      ];
    
      getRecipe(){
        return this.recipes.slice();
      }
}