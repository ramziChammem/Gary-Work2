import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LocalService } from '../../local.service';
import {AdminCredentials} from '../../models/AdminCredentials'

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {
  constructor(
    public local: LocalService,
    private http: HttpClient,
    private router: Router
  ) {}
  email: string;
  password: string;

  ngOnInit(): void {
    this.local.adminSignedIn = false;
    this.local.admin = true;
  }

  login(email, password) {
    this.http
      .post(
        'http://localhost:3000/api/admin/login',
        { email: email, password: password },
        { responseType: 'json' }
      )
      .subscribe((reponse) => {
        if (reponse['err']) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: reponse['err'],
          });
        } else {
          Swal.fire('', 'Successfully Connected!', 'success');
          this.router.navigate(['/admin/users']);
          this.local.adminSignedIn = true;
        }
      });
  }
}
