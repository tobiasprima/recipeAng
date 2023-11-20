import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { Recipe } from '../recipe.model'

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, RecipeItemComponent],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  recipes: Recipe[] = [];
}
