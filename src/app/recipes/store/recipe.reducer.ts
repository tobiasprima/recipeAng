import { Recipe } from "../recipe.model";
import * as RecipesAction from "./recipe.action";



export interface RecipesState {
    recipes: Recipe[];
}

const initialState: RecipesState = {
    recipes: []
}

export function recipeReducer(state: RecipesState = initialState, action: RecipesAction.RecipesActions){
    switch(action.type){
        case RecipesAction.SET_RECIPES:
            return{
                ...state,
                recipes: [...action.payload]
            }
        default:
            return state;
    }
}