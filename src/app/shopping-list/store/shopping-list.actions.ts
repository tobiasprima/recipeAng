import { Action, UPDATE } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";

export const ADD_INGREDIENT= 'ADD_INGREDIENT';
export const ADD_INGREDIENTS= 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT= 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENTS= 'DELETE_INGREDIENTS';

export class AddIngredient implements Action{
    readonly type = ADD_INGREDIENT;
    constructor(public payload?: Ingredient | Action){}
}
export class AddIngredients implements Action{
    readonly type = ADD_INGREDIENTS;
    constructor(public payload?: Ingredient[] | Action){}
}

export class UpdateIngredient implements Action{
    readonly type = UPDATE_INGREDIENT;
    constructor(public payload?: {index: number , ingredient: Ingredient} ){}
}
export class DeleteIngredients implements Action{
    readonly type = DELETE_INGREDIENTS;
    constructor(public payload?: number){}
}

export type ShoppingListActions = AddIngredient | AddIngredients | UpdateIngredient | DeleteIngredients;

