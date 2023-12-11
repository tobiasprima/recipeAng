import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeResolverService } from "./recipes/recipe-resolver.service";
import { AuthComponent } from "./auth/auth.component";
import { authGuardGuard } from "./auth/auth.guard";

const appRoute: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full'},
    { path: 'recipes', component: RecipesComponent, canActivate: [authGuardGuard] ,children: [
        { path: '', component: RecipeStartComponent},
        { path: 'new', component: RecipeEditComponent},
        { 
            path: ':id', 
            component: RecipeDetailComponent, 
            resolve:
            {
                routeResolver: RecipeResolverService
            }
            
        },
        { path: ':id/edit', 
        component: RecipeEditComponent,  
        resolve:{
            routeResolver:  RecipeResolverService
        }
    },
]},
{ path: 'shopping-list', component: ShoppingListComponent},
{ path: 'auth', component: AuthComponent},

]

@NgModule({
    imports: [RouterModule.forRoot(appRoute)],
    exports: [RouterModule],
})

export class AppRoutingModule {

}