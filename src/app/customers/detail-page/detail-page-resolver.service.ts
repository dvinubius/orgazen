import { Injectable } from '@angular/core';
import { tap, filter } from 'rxjs/operators';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Customer } from '../customer.model';
@Injectable({ providedIn: 'root' })
export class DetailPageResolver implements Resolve<Customer> {
  constructor(private db: AngularFirestore) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<Customer> {
    return new Promise<Customer>((succ, fail) => {
      this.db
        .collection('customers')
        .doc<any>(route.paramMap.get('id'))
        .valueChanges()
        .pipe(filter((v) => !!v))
        .subscribe((cust) => succ(cust));
    });
  }
}
