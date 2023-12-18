import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface ShoppingListState {
    ingredients: Ingredient[];
    editedIngredient: Ingredient | null | any;
    editedIngredientIndex: number | any;
}

export interface AppState {
    shoppingList: ShoppingListState
}

const initialState: ShoppingListState = {
    ingredients: [
        new Ingredient('Apple', 5),
        new Ingredient('Tomatoes', 5)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1,
}



export function shoppingListReducer(state: ShoppingListState = initialState, action: ShoppingListActions.ShoppingListActions): ShoppingListState {
    switch (action?.type) {
        case ShoppingListActions.ADD_INGREDIENT:
                return {
                    ...state,
                    ingredients: [...state.ingredients, action.payload as Ingredient]
                };
            return state;

        case ShoppingListActions.ADD_INGREDIENTS:
                return {
                    ...state,
                    ingredients: [...state.ingredients, ...(action.payload as Ingredient[])]
                };
        case ShoppingListActions.UPDATE_INGREDIENT:
                const ingredient = state.ingredients[state.editedIngredientIndex]
                const updatedIngredient = {
                    ...ingredient,
                    ...action.payload
                }
                const updatedIngredients = [...state.ingredients];
                updatedIngredients[state.editedIngredientIndex] = updatedIngredient
                return {
                    ...state,
                    ingredients: updatedIngredients,
                    editedIngredientIndex: -1,
                    editedIngredient: null,
                };

        case ShoppingListActions.DELETE_INGREDIENTS:
                return {
                    ...state,
                    ingredients: state.ingredients.filter((ingredient, ingredientIndex)=> {
                        return ingredientIndex !== state.editedIngredientIndex;
                    }),
                    editedIngredientIndex: -1,
                    editedIngredient: null,
                };

        case ShoppingListActions.START_EDIT:
                return{
                    ...state,
                    editedIngredientIndex: action.payload,
                    editedIngredient: {...state.ingredients[action.payload!]}
                }

        case ShoppingListActions.STOP_EDIT:
                return{
                    ...state,
                    editedIngredientIndex: -1,
                    editedIngredient: null,
                }

        default:
            return state;
    }
}