import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingListService } from '../services/shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private igChangesSub: Subscription;
  constructor(private shoppingListService: ShoppingListService) {}
  ngOnDestroy(): void {
    this.igChangesSub.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.igChangesSub = this.shoppingListService.ingredientsChanged.subscribe(
      (ings: Ingredient[]) => {
        this.ingredients = ings;
      }
    );
  }
  // PushToArray(ing: Ingredient) {
  //   this.ingredients.push(ing);
  // }
  onEdit(index: number) {
    this.shoppingListService.ingredientEdited.next(index);
  }
}
