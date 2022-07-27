import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth/auth.service';
import { recipie } from 'src/app/recipies/recipie.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  userSub: Subscription;
  @Output() selectedfeature: EventEmitter<string> = new EventEmitter<string>();
  constructor(
    private httpService: DataStorageService,
    private authService: AuthService
  ) {}
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  recipies: recipie[] = [];
  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !user ? false : true;
    });
  }
  onSelect(feature: string) {
    this.selectedfeature.emit(feature);
  }
  onSave() {
    this.httpService.storeRecipies();
  }
  onFetch() {
    this.httpService.fetchrecipies().subscribe((recs) => {
      this.recipies = recs;
      console.log(this.recipies);
    });
  }
  onLogout() {
    this.authService.logout();
  }
}
