import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LocalService } from '../local.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private local: LocalService
  ) {}

  ngOnInit(): void {}
  data: {
    email: any;
    password: any;
  };
  serviceProviderIsChecked: any = false;

  checkProvider() {
    this.serviceProviderIsChecked = !this.serviceProviderIsChecked;
  }

  login(email, password) {
    if (!email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please fill all the fields',
      });
    } else if (this.serviceProviderIsChecked) {
      this.http
        .post(
          'http://localhost:3000/api/serviceProvider/login',
          {
            email: email,
            password: password,
          },
          { responseType: 'json' }
        )
        .subscribe((data) => {
          if (data['err']) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data['err'],
            });
          } else if (data['isBanned']) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Account Is Banned',
            });
          } else if (data['isDeclined'] === true) {
            Swal.fire({
              icon: 'error',
              title: 'Your Account has been rejected',
              text: 'Contact us for further information',
            });
          } else if (
            data['isVerified'] === false &&
            data['isDeclined'] === false
          ) {
            Swal.fire({
              icon: 'info',
              title: 'Account is still being verified',
              text:
                'Your Account is still being validated, Please contact us for more information',
            });
          } else {
            localStorage.setItem('token', data['token']);
            localStorage.setItem('svMail', data['email']);

            this.router.navigateByUrl('/spProfile', { state: { data } });
            Swal.fire(
              data['greet'] + ' ' + data['name'],
              data['success'],
              'success'
            );
            localStorage.setItem('visitor', 'no');
          }
        });
    } else {
      this.http
        .post(
          'http://localhost:3000/api/user/login',
          {
            email: email,
            password: password,
          },
          { responseType: 'json' }
        )
        .subscribe((data) => {
          if (data['err']) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data['err'],
            });
          } else if (data['isBanned']) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Account Is Banned',
            });
          } else if (data['isDeclined'] === true) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text:
                'Your Account Validation Is Declined, Contact Us for more information',
            });
          } else {
            localStorage.setItem('lat', data['lat']);
            localStorage.setItem('lng', data['lng']);
            localStorage.setItem('apUserName', data['name']);
            this.local.changeRole('user');
            localStorage.setItem('token', data['token']);
            localStorage.setItem('id', data['id']);
            localStorage.setItem('userName', data['name']);

            this.router.navigateByUrl('/userServices');
            Swal.fire(
              data['greet'] + ' ' + data['name'],
              data['success'],
              'success'
            );
            localStorage.setItem('visitor', 'yes');
          }
        });
    }
  }
}
