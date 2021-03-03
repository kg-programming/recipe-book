import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthInterceptorService } from '../auth/auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
})
export class CoreModule {}