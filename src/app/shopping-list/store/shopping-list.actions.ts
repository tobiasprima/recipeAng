import { Action } from "@ngrx/store";

export const ADD_INGREDIENT= 'ADD_INGREDIENT';

export class AddIngredient implements Action{
    readonly type = ADD_INGREDIENT;

}