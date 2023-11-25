import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()

export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

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


      constructor(private shoppingListService: ShoppingListService){}
    
      getRecipe(){
        return this.recipes.slice();
      }

      getRecipebyId(index: number){
        return this.recipes.slice()[index];
      }


      addToShoppingList(ingredient: Ingredient[]){
        this.shoppingListService.addIngredients(ingredient);
      }

      addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }
}