import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackbar: MatSnackBar, private router: Router) {}

  authError(onAction: () => void, redirectUrl: string) {
    this.snackbar.open('You must be logged in!', 'OK', { duration: 5000 });

    return this.snackbar._openedSnackBarRef
      .onAction()
      .pipe(
        tap((_) => {
          onAction();
          this.router.navigate(['/login'], {
            queryParams: { redirectUrl: redirectUrl },
          });
        })
      )
      .subscribe();
  }
}
