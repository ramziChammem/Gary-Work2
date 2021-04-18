import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignupComponent } from './signup/signup.component';
import { SpProfileComponent } from './sp-profile/sp-profile.component';
import { AdminNavComponent } from './admin/admin-nav/admin-nav.component';
import { UserServicesComponent } from './user-services/user-services.component';
import { AdminLoginComponent } from './Admin/admin-login/admin-login.component';
import { AdminComponent } from './Admin/admin/admin.component';
import {MessagesComponent} from './Admin/messages/messages.component';
import {ProvidersComponent} from './Admin/providers/providers.component'
import {UsersComponent} from './Admin/users/users.component'
import {RequestsComponent} from './Admin/requests/requests.component';
import{ProfessionsComponent} from './Admin/professions/professions.component'
import { VesitorProfileComponent } from './vesitor-profile/vesitor-profile.component';
import { AuthGuard } from './auth/auth.guard';
import {UserProfileComponent} from './user-profile/user-profile.component';
import { NewsignupComponent } from './newsignup/newsignup.component';




const routes: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full' },
  // {path:'admin', component:AdminComponent},
  {path:'halim', component:NewsignupComponent},
  { path: 'alogin', component: AdminLoginComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'providerSignup', component: SignUpComponent },
  { path: 'userSignup', component: SignupComponent },
  { path: 'spProfile', component: SpProfileComponent, canActivate:[AuthGuard]},
  {
    path: 'admin',
    loadChildren: () =>
    import("./modules/admin/admin.module").then(
      (module) => module.AdminModule
    )
    // children:[
    //   {path:'', component:AdminComponent},
    //   {path:'sps', component:ProvidersComponent},
    //   {path:'messages', component:MessagesComponent},
    //   {path:'users', component:UsersComponent},
    //   {path:'requests', component:RequestsComponent},
    //   {path:'services', component:ProfessionsComponent}
    // ]
  },
  {path: 'fisitor', component: VesitorProfileComponent},
  {path: 'user-profile', component: UserProfileComponent},
  

  {path: 'userServices', component: UserServicesComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
