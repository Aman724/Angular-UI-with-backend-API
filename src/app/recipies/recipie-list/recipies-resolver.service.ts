import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { recipie } from '../recipie.model';

@Injectable({
  providedIn: 'root',
})
export class RecipieResolverService implements Resolve<recipie[]> {
  constructor(private httpService: DataStorageService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): recipie[] | Observable<recipie[]> | Promise<recipie[]> {
    throw new Error('Method not implemented.');
  }
}
