import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';
import { AuthGuard } from './auth/auth/auth.guard';
import { RecipieDetailComponent } from './recipies/recipie-detail/recipie-detail.component';
import { RecipieEditComponent } from './recipies/recipie-edit/recipie-edit.component';
import { RecipieStartComponent } from './recipies/recipie-start/recipie-start.component';
import { RecipiesComponent } from './recipies/recipies.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes = [
  //{ path: '', redirectTo: '/recipies', pathMatch: 'prefix' },
  { path: '', component: RecipiesComponent, canActivate: [AuthGuard] },
  {
    path: 'recipies',
    component: RecipiesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: RecipieStartComponent },
      { path: 'new', component: RecipieEditComponent },
      { path: ':id', component: RecipieDetailComponent },
      { path: ':id/edit', component: RecipieEditComponent },
    ],
  },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
