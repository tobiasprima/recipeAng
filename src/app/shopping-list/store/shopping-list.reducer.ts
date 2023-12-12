import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

const initialState = {
    ingredients: [
        new Ingredient('Apple', 5),
        new Ingredient('Tomatoes', 5)
      ]
}

export function shoppingListReducer(state = initialState, action: ShoppingListActions.AddIngredient | Action) {
    switch (action.type){
        case ShoppingListActions.ADD_INGREDIENT:
            if ('payload' in action && action.payload instanceof Ingredient) {
                return {
                  ...state,
                  ingredients: [...state.ingredients, action.payload]
                };
            }
    }
}