import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilesRoutingModule } from './profiles-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SpProfileComponent } from './sp-profile/sp-profile.component';
import { VisitorProfileComponent } from './visitor-profile/visitor-profile.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { LocationComponent } from './location/location.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ModalReviewComponent } from './modal-review/modal-review.component';


@NgModule({
  declarations: [UserProfileComponent, SpProfileComponent, VisitorProfileComponent, AppointmentsComponent, LocationComponent, ReviewsComponent, ModalReviewComponent],
  imports: [
    CommonModule,
    ProfilesRoutingModule
  ]
})
export class ProfilesModule { }
