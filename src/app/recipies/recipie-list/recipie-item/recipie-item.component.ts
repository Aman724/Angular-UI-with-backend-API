import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RecipieService } from 'src/app/services/recipie.service';
import { recipie } from '../../recipie.model';

@Component({
  selector: 'app-recipie-item',
  templateUrl: './recipie-item.component.html',
  styleUrls: ['./recipie-item.component.css'],
})
export class RecipieItemComponent implements OnInit {
  @Input() recipieItem: recipie;
  @Input() index: number;
  //constructor(private recipieService: RecipieService) {}
  ngOnInit(): void {}
  //@Output() sendRecipietoList: EventEmitter<recipie> = new EventEmitter();
  // SendTheCurrentRecipie(): void {
  //   this.recipieService.recipieSelected.emit(this.recipieItem);
  // }
}
