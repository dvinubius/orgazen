import { Directive, HostListener, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Directive({
  selector: '[appGoogleSignin]',
})
export class GoogleSigninDirective {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  @Input() redirectUrl: string;

  @HostListener('click')
  async onClick() {
    const res = await this.afAuth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
    if (res.user && this.redirectUrl) {
      this.router.navigateByUrl(this.redirectUrl);
    }
  }
}
