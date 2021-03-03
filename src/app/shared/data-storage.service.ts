import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  rootUrl = 'https://recipe-book-c1be3.firebaseio.com/';
  recipeUrl = `${this.rootUrl}/recipes.json`;

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  // storeRecipes() {
  //   const recipes = this.recipeService.getRecipes();
  //   return this.http.put(`${this.rootUrl}/recipes.json`, recipes);
  // }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.recipeUrl, recipes).subscribe((response) => {
      console.log(response);
    });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.recipeUrl).pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
