import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map((user) => {
        const isLoggedIn = !!user;
        if (isLoggedIn) {
          this.router.navigateByUrl('/kanban');
        }

        return !isLoggedIn;
      })
    );
  }
}
