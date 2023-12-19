import * as fromAuth from '../auth/store/auth.reducer';
import * as fromRecipes from '../recipes/store/recipe.reducer';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer'; 
import { ActionReducerMap } from '@ngrx/store';


export const rootReducer = {};

export interface AppState {
    shoppingList: fromShoppingList.ShoppingListState;
    auth: fromAuth.AuthState;
    recipes: fromRecipes.RecipesState
};


export const reducers: ActionReducerMap<AppState, any> = {
    shoppingList: fromShoppingList.shoppingListReducer,
    auth: fromAuth.authReducer,
    recipes: fromRecipes.recipeReducer
};