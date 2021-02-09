import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { SnackbarService } from '../notification/snackbar.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth,
    private snack: SnackbarService,
    private router: Router,
    @Inject(PLATFORM_ID) protected platformId: Object
  ) {}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const targetUrl = route.url.length > 0 ? route.url[0].path : null;
    const user = await this.afAuth.auth.currentUser;
    const isLoggedIn = !!user;

    if (!isLoggedIn) {
      if (isPlatformBrowser(this.platformId)) {
        const timeout = setTimeout(
          () =>
            this.router.navigate(['/login'], {
              queryParams: { redirectUrl: targetUrl },
            }),
          5000
        );
        this.snack.authError(() => clearTimeout(timeout), targetUrl);
      } else {
        this.snack.authError(() => {}, targetUrl);
      }
    }

    return isLoggedIn;
  }
}
