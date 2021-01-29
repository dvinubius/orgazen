import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private sub: Subscription;
  redirectUrl: string;
  constructor(public afAuth: AngularFireAuth, private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe((queryParams) => {
      this.redirectUrl = queryParams['redirectUrl'];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
