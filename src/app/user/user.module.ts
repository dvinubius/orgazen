import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { GoogleSigninDirective } from './directives/google-signin.directive';
import { SharedModule } from '../shared/shared.module';
import { EmailLoginComponent } from './email-login/email-login.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, GoogleSigninDirective, EmailLoginComponent],
  imports: [CommonModule, SharedModule, UserRoutingModule, ReactiveFormsModule],
})
export class UserModule {}
