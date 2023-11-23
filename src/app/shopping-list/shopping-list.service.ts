import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

@Injectable()

export class ShoppingListService {
    ingredientChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apple', 5),
        new Ingredient('Tomatoes', 5)
      ];

      getIngredient(){
        return this.ingredients.slice();
      }
      getItem(index: number){
        return this.ingredients[index]
      }

      addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient)
        this.ingredientChanged.next(this.ingredients.slice());
      }

      addIngredients(ingredients:Ingredient[]){
        // for(let ingredient of ingredients){
        //   this.addIngredient(ingredient);
        // }
        this.ingredients.push(...ingredients);
        this.ingredientChanged.next(this.ingredients.slice());
      }

      
}