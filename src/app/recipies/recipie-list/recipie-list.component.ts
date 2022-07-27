import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, OutletContext, Router } from '@angular/router';
import { RecipieService } from 'src/app/services/recipie.service';
import { recipie } from '../recipie.model';

@Component({
  selector: 'app-recipie-list',
  templateUrl: './recipie-list.component.html',
  styleUrls: ['./recipie-list.component.css'],
})
export class RecipieListComponent implements OnInit {
  constructor(
    private recipieService: RecipieService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  recipies: recipie[];
  ngOnInit(): void {
    this.recipieService.recipiesChanged.subscribe((recs: recipie[]) => {
      this.recipies = recs;
    });
    this.recipies = this.recipieService.getRecipies();
  }
  onNewRecipie() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
