import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

@Injectable()

export class ShoppingListService {
    private ingredients: Ingredient[] = [
        new Ingredient('Apple', 5),
        new Ingredient('Tomatoes', 5)
      ];

      getIngredient(){
        return this.ingredients.slice();
      }
}