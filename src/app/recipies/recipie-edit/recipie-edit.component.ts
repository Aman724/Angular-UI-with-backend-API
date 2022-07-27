import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormControlDirective,
  FormGroup,
  NgForm,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipieService } from 'src/app/services/recipie.service';
import { recipie } from '../recipie.model';

@Component({
  selector: 'app-recipie-edit',
  templateUrl: './recipie-edit.component.html',
  styleUrls: ['./recipie-edit.component.css'],
})
export class RecipieEditComponent implements OnInit {
  Id: number;
  Recipie: recipie;
  editMode = false;
  editForm: NgForm;
  recipieForm: FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private res: RecipieService
  ) {}

  ngOnInit(): void {
    this.Id = this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      this.Id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }
  OnSubmit() {
    console.log(this.editForm);
  }
  private initForm() {
    let recipieName = '';
    let recipieImagePath = '';
    let recipieDescription = '';
    let recipieIngredients = new FormArray([]);
    if (this.editMode) {
      const recipie = this.res.getRecipie(this.Id);
      recipieName = recipie.name;
      recipieImagePath = recipie.imagepath;
      recipieDescription = recipie.description;
      if (recipie['ingredients']) {
        for (let ing of recipie.ingredients) {
          recipieIngredients.push(
            new FormControl({
              name: new FormControl(ing.name),
              amount: new FormControl(ing.amount),
            })
          );
        }
      }
    }

    this.recipieForm = new FormGroup({
      name: new FormControl(recipieName),
      imagepath: new FormControl(recipieImagePath),
      description: new FormControl(recipieDescription),
      ingredients: recipieIngredients,
    });
  }
  get controls() {
    return (<FormArray>this.recipieForm.get('ingredients')).controls;
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onSubmit() {
    //const newRes = new recipie(this.recipieForm.value['name'],..);
    if (this.editMode) {
      this.res.updateRecipie(this.Id, this.recipieForm.value);
    } else {
      this.res.addRecipie(this.recipieForm.value);
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
