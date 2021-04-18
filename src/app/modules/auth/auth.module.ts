import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './signin/signin.component';
import { SpSignUpComponent } from './sp-sign-up/sp-sign-up.component';
import { UserSignUpComponent } from './user-sign-up/user-sign-up.component';


@NgModule({
  declarations: [SigninComponent, SpSignUpComponent, UserSignUpComponent],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
