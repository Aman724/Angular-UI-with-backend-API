import { NgForOf } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Subscribable, Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  editMode = false;
  editeedItemIndex: number;
  @ViewChild('nameInput')
  nameInputRef: ElementRef;
  @ViewChild('amountInput')
  amountInputRef: ElementRef;

  @ViewChild('f') slForm: NgForm;

  ing: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  sub: Subscription;
  ngOnInit(): void {
    this.sub = this.shoppingListService.ingredientEdited.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editeedItemIndex = index;
        this.ing = this.shoppingListService.getIngredient(
          this.editeedItemIndex
        );
        this.slForm.setValue({
          name: this.ing.name,
          amount: this.ing.amount,
        });
      }
    );

    //
  }

  onAddiItem(form: NgForm) {
    const value = form.value;
    this.ing = value;
    if (this.editMode) {
      this.shoppingListService.updateIngredient(
        this.editeedItemIndex,
        this.ing
      );
    } else {
      // const ingName = this.nameInputRef.nativeElement.value;
      // const ingAmount = this.amountInputRef.nativeElement.value;

      const newIngredient = new Ingredient(value.name, value.amount);
      this.shoppingListService.AddIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }
  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }
  onDelete() {
    this.shoppingListService.deleteIngredient(this.editeedItemIndex);
    this.onClear();
  }
}
