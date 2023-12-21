import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map, switchMap } from 'rxjs';
import * as RecipeActions from '../store/recipe.action';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
  recipe!: Recipe | undefined;
  id!: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
    ){}

  ngOnInit() {
    this.route.params.pipe(map(params => {
      return +params['id'];
    }),switchMap(id => {
      this.id = id;
      return this.store.select('recipes');
    }),
    map(recipeState =>  
      {
        return recipeState.recipes.find((recipe, index) => {
          return index === this.id;
        });
      })).subscribe(recipe => {
        this.recipe = recipe;
      })
  }

  onAddtoShoppingList(){
    // this.recipeService.addToShoppingList(this.recipe!.ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe?.ingredients))
  }

  onEditRecipe(){
    // this.router.navigate(['edit'], {relativeTo: this.route })
    this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route})
  }

  onDeleteRecipe(){
    // this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id))
    this.router.navigate(['/recipes']);
  }
}
