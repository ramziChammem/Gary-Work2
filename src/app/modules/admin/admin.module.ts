import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminMessagesComponent} from './admin-messages/admin-messages.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import {AdminPageComponent} from './admin-page/admin-page.component';
import { FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {AdminProfessionsComponent} from './admin-professions/admin-professions.component';
import {AdminProvidersComponent} from './admin-providers/admin-providers.component';
import {AdminRequestsComponent} from './admin-requests/admin-requests.component';
import {AdminUsersComponent} from './admin-users/admin-users.component';
import { DataTablesModule } from 'angular-datatables';
@NgModule({
  declarations: [AdminLoginComponent,
    AdminMessagesComponent,
     AdminNavComponent,
     AdminPageComponent,
     AdminProfessionsComponent,
     AdminProvidersComponent,
     AdminRequestsComponent,
     AdminUsersComponent
    ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    DataTablesModule,
    MDBBootstrapModule.forRoot(),
  ]
})
export class AdminModule { }
