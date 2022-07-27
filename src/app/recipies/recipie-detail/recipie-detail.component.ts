import { Component, Input, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Params,
  RouteConfigLoadEnd,
  Router,
} from '@angular/router';
import { RecipieService } from 'src/app/services/recipie.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { recipie } from '../recipie.model';

@Component({
  selector: 'app-recipie-detail',
  templateUrl: './recipie-detail.component.html',
  styleUrls: ['./recipie-detail.component.css'],
})
export class RecipieDetailComponent implements OnInit {
  Recipie: recipie;
  constructor(
    private res: RecipieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  Id: number;
  ngOnInit(): void {
    //this.Id = this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      this.Id = +params['id'];
      this.Recipie = this.res.getRecipie(this.Id);
    });
  }
  onAddToShoppingList() {
    this.res.addIngtoShoppingList(this.Recipie.ingredients);
  }
  onDelete() {
    this.res.deleteRecipie(this.Id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
