import { EmbeddedViewRef, EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { recipie } from '../recipies/recipie.model';
import { DataStorageService } from '../shared/data-storage.service';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable()
export class RecipieService {
  recipieSelected: Subject<recipie> = new Subject();
  recipiesChanged = new Subject<recipie[]>();
  private recipies: recipie[] = [
    new recipie(
      'Burger',
      'Test decription',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYq7EbJI6NxldhK59veSdy-MbVMED_b2XlmQ&usqp=CAU',
      [new Ingredient('Meat', 1), new Ingredient('French fries', 20)]
    ),
    new recipie(
      'Another Test Recipie',
      'Test decription',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYq7EbJI6NxldhK59veSdy-MbVMED_b2XlmQ&usqp=CAU',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
    ),
  ];
  constructor(private ss: ShoppingListService) {}

  setRecipies(recipies: recipie[]) {
    this.recipies = recipies;
    this.recipiesChanged.next(this.recipies.slice());
  }

  getRecipies() {
    return this.recipies.slice();
  }
  addIngtoShoppingList(ingredients: Ingredient[]) {
    this.ss.addIngredients(ingredients);
  }
  getRecipie(index: number) {
    return this.recipies[index];
  }
  deleteRecipie(index: number) {
    this.recipies.splice(index, 1);
    this.recipiesChanged.next(this.recipies.slice());
  }
  addRecipie(res: recipie) {
    this.recipies.push(res);
    this.recipiesChanged.next(this.recipies.slice());
  }
  updateRecipie(index: number, newRes: recipie) {
    this.recipies[index] = newRes;
    this.recipiesChanged.next(this.recipies.slice());
  }
}
