import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminMessagesComponent } from './admin-messages/admin-messages.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import {AdminPageComponent} from './admin-page/admin-page.component';
import {AdminProfessionsComponent} from './admin-professions/admin-professions.component';
import {AdminProvidersComponent} from './admin-providers/admin-providers.component';
import {AdminRequestsComponent} from './admin-requests/admin-requests.component';
import {AdminUsersComponent} from './admin-users/admin-users.component';
const routes: Routes = [
  { 
    path: "",
    component: AdminNavComponent,
    children: [
      {
        path: "login",
        component: AdminLoginComponent
      },
      {
        path: "messages",
        component: AdminMessagesComponent
      },
      { 
        path: "nav",
        component: AdminNavComponent
      },
      { 
        path: "adminPage",
        component: AdminPageComponent
      },
      { 
        path:"professions",
        component: AdminProfessionsComponent 
      },
      { 
        path:"service-providers",
        component: AdminProvidersComponent 
      },
      { 
        path:"requests",
        component:AdminRequestsComponent 
      },
      { 
        path:"users",
        component:AdminUsersComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
