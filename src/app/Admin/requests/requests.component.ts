import { Component, OnInit } from '@angular/core';
import { AdminServices } from '../../services/admin.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})
export class RequestsComponent implements OnInit {
  requests: any = [];
  constructor(private admin: AdminServices) {}

  ngOnInit(): void {
    this.admin.getSpList().subscribe((data) => {
      this.requests = data;
      this.requests = this.requests.filter((el) => {
        return el.isVerified === false && el.isDeclined === false;
      });
    });
  }

  verifyAcc(id) {
    Swal.fire({
      title: 'Verify Account?',
      text: '',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#4BB543',
      cancelButtonColor: '#576490',
      confirmButtonText: 'Verify',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('', 'Account Verified!', 'success');
        this.admin.verifyAccount(id).subscribe((res) => {
          this.ngOnInit();
        });
      }
    });
  }

  reject(id) {
    Swal.fire({
      title: 'Decline Account?',
      text: '',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: 'red',
      cancelButtonColor: '#576490',
      confirmButtonText: 'Decline',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('', 'Account Declined', 'success');
        this.admin.declineAccount(id).subscribe((data) => {
          this.ngOnInit();
        });
      }
    });
  }
}
