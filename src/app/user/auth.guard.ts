import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { SnackbarService } from '../notification/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth,
    private snack: SnackbarService,
    private router: Router
  ) {}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const targetUrl = route.url.length > 0 ? route.url[0].path : null;
    const user = await this.afAuth.currentUser;
    const isLoggedIn = !!user;
    if (!isLoggedIn) {
      const timeout = setTimeout(
        () =>
          this.router.navigate(['/login'], {
            queryParams: { redirectUrl: targetUrl },
          }),
        5000
      );
      this.snack.authError(() => clearTimeout(timeout), targetUrl);
    }

    return isLoggedIn;
  }
}
