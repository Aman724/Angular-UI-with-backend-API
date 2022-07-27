import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscribable, Subscription } from 'rxjs';
import { RecipieService } from '../services/recipie.service';
import { recipie } from './recipie.model';

@Component({
  selector: 'app-recipies',
  templateUrl: './recipies.component.html',
  styleUrls: ['./recipies.component.css'],
  providers: [RecipieService],
})
export class RecipiesComponent implements OnInit, OnDestroy {
  selectedrecipie: recipie;
  resSelected: Subscription;
  constructor(private recipieService: RecipieService) {}
  ngOnDestroy(): void {
    this.resSelected.unsubscribe();
  }

  ngOnInit(): void {
    this.resSelected = this.recipieService.recipieSelected.subscribe(
      (recipie: recipie) => {
        this.selectedrecipie = recipie;
      }
    );
  }
  // selectedRecipie(Recipie: recipie) {
  //   this.selectedrecipie = Recipie;
  // }
}
