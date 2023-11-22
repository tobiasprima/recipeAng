import { Component, NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";

const appRoute: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full'},
    { path: 'recipes', component: RecipesComponent, children: [
        { path: '', component: RecipeStartComponent}
    ]},
    { path: 'shopping-list', component: ShoppingListComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoute)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}