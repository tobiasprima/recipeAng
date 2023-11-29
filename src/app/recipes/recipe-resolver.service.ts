import { Injectable } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { delay } from "rxjs";

@Injectable({providedIn: "root"})
export class RecipeResolverService   {
    constructor(private dataStorageService: DataStorageService){}

    resolve: ResolveFn<Recipe[]> = () => {
        return this.dataStorageService.fetchRecipes();
      };
    }