import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredientsChanged: Subject<Ingredient[]> = new Subject();
  ingredientEdited: Subject<number> = new Subject();
  Ing: Ingredient;
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  getIngredients() {
    return this.ingredients.slice();
  }
  updateIngredient(index: number, ing: Ingredient) {
    this.ingredients[index] = ing;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  getIngredient(index: number) {
    return this.ingredients[index];
  }
  AddIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  AddIngredients(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  addIngredients(ings: Ingredient[]) {
    this.ingredients.push(...ings);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
