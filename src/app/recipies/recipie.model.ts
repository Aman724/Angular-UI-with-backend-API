import { ConditionalExpr } from '@angular/compiler';
import { Ingredient } from '../shared/ingredient.model';

export class recipie {
  public name: string;
  public description: string;
  public imagepath: string;
  public ingredients: Ingredient[];
  constructor(
    public cname: string,
    public cdecription: string,
    public cimagepath: string,
    ingredients: Ingredient[]
  ) {
    this.name = cname;
    this.description = cdecription;
    this.imagepath = cimagepath;
    this.ingredients = ingredients;
  }
}
