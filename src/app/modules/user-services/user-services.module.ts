import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserServicesRoutingModule } from './user-services-routing.module';
import { UserServicessComponent } from './user-servicess/user-servicess.component';


@NgModule({
  declarations: [UserServicessComponent],
  imports: [
    CommonModule,
    UserServicesRoutingModule
  ]
})
export class UserServicesModule { }
