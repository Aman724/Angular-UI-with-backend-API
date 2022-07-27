import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { exhaustMap, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth/auth.service';
import { recipie } from '../recipies/recipie.model';
import { RecipieService } from '../services/recipie.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private res: RecipieService,
    private authService: AuthService
  ) {}
  // get() {
  //   this.http.get.subscribe((recipies) => {
  //     (responseData) => {
  //       console.log(responseData);
  //     };
  //   });
  // }
  storeRecipies() {
    const recipies = this.res.getRecipies();
    this.http
      .put(
        'https://angular-backend-8e015-default-rtdb.firebaseio.com/recipies.json',
        recipies
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
  fetchrecipies() {
    //take(1)--> tells get the emitted value for the first time only and they unsubscribe
    //i.e we only get the user once when logged in and not in every change on user like in case of subject
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get<recipie[]>(
          'https://angular-backend-8e015-default-rtdb.firebaseio.com/recipies.json'
        );
        // .pipe(
        //   map((recipies) => {
        //     return (
        //       recipies.map((recipie) => {
        //         return {
        //           ...recipie,
        //           ingredients: recipie.ingredients ? recipie.ingredients : [],
        //         };
        //       }),
        //       tap((recipies) => {
        //         this.res.setRecipies(recipies);
        //       })
        //     );
        //   })
        // );
      })
    );
  }
}
