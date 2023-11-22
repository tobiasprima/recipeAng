import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [CommonModule, ShoppingEditComponent],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit{
  ingredients!: Ingredient[];

  constructor(private shoppingListService: ShoppingListService){}

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredient();
}
  onIngredientAdded(ingredient: Ingredient){
    this.ingredients.push(ingredient);
  }
}
