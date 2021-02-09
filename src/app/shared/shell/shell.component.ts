import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Handset])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  get isInBrowser() {
    const val = isPlatformBrowser(this.platformId);
    return isPlatformBrowser(this.platformId);
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    public afAuth: AngularFireAuth,
    private router: Router,
    @Inject(PLATFORM_ID) protected platformId: Object
  ) {}

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('');
  }
}
