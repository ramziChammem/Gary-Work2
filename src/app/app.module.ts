import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomepageComponent } from './homepage/homepage.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './homepage/footer/footer.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ServiceSectionComponent } from './homepage/service-section/service-section.component';
import { AboutComponent } from './homepage/about/about.component';
import { TestimonialsComponent } from './homepage/testimonials/testimonials.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';

// Modules
import { AdminModule } from './modules/admin/admin.module'

import { DataTablesModule } from 'angular-datatables';
import { PanelModule } from 'primeng/panel';
import { AgmCoreModule } from '@agm/core';

import { FormsModule } from '@angular/forms';

import { SpProfileComponent } from './sp-profile/sp-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReviewsComponent } from './reviews/reviews.component';
// import { AdminNavComponent } from './admin/admin-nav/admin-nav.component';
// import { MessagesComponent } from './admin/messages/messages.component';
import { UserServicesComponent } from './user-services/user-services.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { AdminLoginComponent } from './Admin/admin-login/admin-login.component';
// import { AdminComponent } from './Admin/admin/admin.component';
import { ModalReviewComponent } from './modal-review/modal-review.component';
// import { ProvidersComponent } from './Admin/providers/providers.component';
// import { UsersComponent } from './Admin/users/users.component';
// import { RequestsComponent } from './Admin/requests/requests.component';
import { LocationComponent } from './location/location.component';
import { LiveChatComponent } from './live-chat/live-chat.component';
import { VesitorProfileComponent } from './vesitor-profile/vesitor-profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
// import { ProfessionsComponent } from './Admin/professions/professions.component';
import { NewsignupComponent } from './newsignup/newsignup.component';
@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    FooterComponent,
    ServiceSectionComponent,
    AboutComponent,
    TestimonialsComponent,
    SignInComponent,
    SignUpComponent,
    SignupComponent,
    NavbarComponent,
    SpProfileComponent,
    ReviewsComponent,
    // AdminNavComponent,
    // MessagesComponent,
    UserServicesComponent,
    // AdminLoginComponent,
    // AdminComponent,
    ModalReviewComponent,
    // ProvidersComponent,
    // UsersComponent,
    // RequestsComponent,
    LocationComponent,
    LiveChatComponent,
    VesitorProfileComponent,
    UserProfileComponent,
    // ProfessionsComponent,
    NewsignupComponent,
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    DataTablesModule,
    PanelModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDapTrWdHVdzoF7ttygRmfv0XqIDkonBqg',
      libraries: ['places'],
    }),
    AdminModule
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
