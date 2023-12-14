import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface AppState {
    ingredients: Ingredient[];
}

const initialState: AppState = {
    ingredients: [
        new Ingredient('Apple', 5),
        new Ingredient('Tomatoes', 5)
    ]
}

export function isAddIngredientAction(action: Action): action is ShoppingListActions.AddIngredient {
    return action.type === ShoppingListActions.ADD_INGREDIENT;
}

export function isAddIngredientsAction(action: Action): action is ShoppingListActions.AddIngredients {
    return action.type === ShoppingListActions.ADD_INGREDIENTS;
}

export function shoppingListReducer(state: AppState = initialState, action: ShoppingListActions.AddIngredient | Action): AppState {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            if (isAddIngredientAction(action)) {
                return {
                    ...state,
                    ingredients: [...state.ingredients, action.payload as Ingredient]
                };
            }
            return state;

        case ShoppingListActions.ADD_INGREDIENTS:
            if (isAddIngredientsAction(action)) {
                return {
                    ...state,
                    ingredients: [...state.ingredients, ...(action.payload as Ingredient[])]
                };
            }
            return state;

        default:
            return state;
    }
}