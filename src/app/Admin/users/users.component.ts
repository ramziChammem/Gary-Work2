import { Component, ViewChild, OnInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AdminServices } from '../../services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  isDtInitialized: boolean = false;

  dtOptions: DataTables.Settings = {};

  users: any = [];

  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private usersList: AdminServices) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 4,
    };
    this.usersList.getUsersList().subscribe((data) => {
      this.users = data;
      if (this.isDtInitialized) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
      } else {
        this.isDtInitialized = true;
        this.dtTrigger.next();
      }
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ban(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm Ban!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('', 'User Is Banned!', 'success');
        this.usersList.banUser(id).subscribe((data) => {
          this.ngOnInit();
        });
      }
    });
  }

  unBan(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm Unban!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('', 'User Is Unbanned', 'success');
        this.usersList.unbanUser(id).subscribe((data) => {
          this.ngOnInit();
        });
      }
    });
  }
}
