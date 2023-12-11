import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { AuthComponent } from "./auth/auth.component";

const appRoute: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full'}, 
]

@NgModule({
    imports: [RouterModule.forRoot(appRoute)],
    exports: [RouterModule],
})

export class AppRoutingModule {

}