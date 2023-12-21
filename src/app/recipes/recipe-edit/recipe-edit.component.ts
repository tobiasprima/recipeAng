import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { Subscription, map } from 'rxjs';
import * as RecipeActions from '../store/recipe.action';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit, OnDestroy{
  id!: number;
  editMode = false;
  recipeForm!: FormGroup;

  private storeSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    // private recipeService: RecipeService,
    private router: Router,
    private store: Store<fromApp.AppState>
    ){}

  ngOnInit() {
      this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm()
        }
      )
  }

  onSubmit(){
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'], 
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']); assigning value one by one method
    if(this.editMode){
      // this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      this.store.dispatch(new RecipeActions.UpdateRecipe({index: this.id, newRecipe: this.recipeForm.value}))
    } else{
      // this.recipeService.addRecipe(this.recipeForm.value)
      this.store.dispatch(new RecipeActions.AddRecipe(this.recipeForm.value))
    }
    this.onCancel();
  }

  onAddIngredient(){
   (<FormArray>this.recipeForm.get('ingredients')).push(
    new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [
        Validators.required, 
        Validators.pattern(/^[1-9]+[0-9]*$/)] ),
    })
   )
  }

  onDeleteIngredient(index: number){
    const formArray = this.recipeForm.get('ingredients') as FormArray;
    formArray.removeAt(index)
  }
  
  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  ngOnDestroy(): void {
      this.storeSub.unsubscribe();
  }

  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray<FormGroup>([]);
    if(this.editMode){
      // const recipe = this.recipeService.getRecipebyId(this.id);
      this.storeSub = this.store.select('recipes').pipe(map(recipeState=> {
        return recipeState.recipes.find((recipe, index)=> {
          return index === this.id;
        })
      })).subscribe(recipe => {
      recipeName = recipe!.name;
      recipeImagePath = recipe!.imagePath;
      recipeDescription = recipe!.description;
      if(recipe!['ingredients']){
        for(let ingredient of recipe!.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name' : new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount,[
                Validators.required, 
                Validators.pattern(/^[1-9]+[0-9]*$/)]),
            })
          )
        }
      }
      })
      
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients,
    })
  }
  getIngredientsControls(): AbstractControl[]{
    const formArray = this.recipeForm.get('ingredients') as FormArray;
    return formArray ? formArray.controls : []
  }

}
