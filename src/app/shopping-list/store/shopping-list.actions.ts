import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";

export const ADD_INGREDIENT= 'ADD_INGREDIENT';
export const ADD_INGREDIENTS= 'ADD_INGREDIENTS';

export class AddIngredient implements Action{
    readonly type = ADD_INGREDIENT;
    constructor(public payload?: Ingredient | Action){}
}
export class AddIngredients implements Action{
    readonly type = ADD_INGREDIENTS;
    constructor(public payload?: Ingredient[] | Action){}
}

export type ShoppingListActions = AddIngredient | AddIngredients;

export function isAddIngredientAction(action: Action): action is AddIngredient {
    return action.type === ADD_INGREDIENT;
  }
  
  export function isAddIngredientsAction(action: Action): action is AddIngredients {
    return action.type === ADD_INGREDIENTS;
  }