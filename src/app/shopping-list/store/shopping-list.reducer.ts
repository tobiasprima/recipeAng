import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface State {
    ingredients: Ingredient[];
    editedIngredient: string | null;
    editedIngredientIndex: number;
}

export interface AppState {
    shoppingList: State
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apple', 5),
        new Ingredient('Tomatoes', 5)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1,
}

export function isAddIngredientAction(action: Action): action is ShoppingListActions.AddIngredient {
    return action.type === ShoppingListActions.ADD_INGREDIENT;
}

export function isAddIngredientsAction(action: Action): action is ShoppingListActions.AddIngredients {
    return action.type === ShoppingListActions.ADD_INGREDIENTS;
}

export function isUpdateIngredientAction(action: Action): action is ShoppingListActions.UpdateIngredient {
    return action.type === ShoppingListActions.UPDATE_INGREDIENT;
    }
    
export function isDeleteIngredientsAction(action: Action): action is ShoppingListActions.DeleteIngredients {
    return action.type === ShoppingListActions.DELETE_INGREDIENTS;
    }

export function shoppingListReducer(state: State = initialState, action: ShoppingListActions.AddIngredient | Action): State {
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
        case ShoppingListActions.UPDATE_INGREDIENT:
            if (isUpdateIngredientAction(action)) {
                const ingredient = state.ingredients[action.payload?.index as number]
                const updatedIngredient = {
                    ...ingredient,
                    ...action.payload?.ingredient
                }
                const updatedIngredients = [...state.ingredients];
                updatedIngredients[action.payload?.index as number] = updatedIngredient
                return {
                    ...state,
                    ingredients: updatedIngredients
                };
            }
            return state;

        case ShoppingListActions.DELETE_INGREDIENTS:
            if (isDeleteIngredientsAction(action)) {
                return {
                    ...state,
                    ingredients: state.ingredients.filter((ingredient, ingredientIndex)=> {
                        return ingredientIndex !== action.payload;
                    })
                };
            }
            return state;

        default:
            return state;
    }
}