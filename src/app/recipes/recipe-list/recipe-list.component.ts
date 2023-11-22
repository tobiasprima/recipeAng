import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { Recipe } from '../recipe.model'
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, RecipeItemComponent],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
  providers: [RecipeService],
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasClicked = new EventEmitter<Recipe>();
  
  recipes!: Recipe[] ;

  constructor(private recipeService: RecipeService){}

  ngOnInit() {
      this.recipes=this.recipeService.getRecipe();
  }

    onRecipeClicked(recipe: Recipe){
      this.recipeWasClicked.emit(recipe);
    }
}
