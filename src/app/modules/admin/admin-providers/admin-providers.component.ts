import { Component, ViewChild, OnInit } from '@angular/core';
import { AdminServices } from '../../../services/admin.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { LocalService } from '../../../local.service';

@Component({
  selector: 'app-admin-providers',
  templateUrl: './admin-providers.component.html',
  styleUrls: ['./admin-providers.component.scss']     
})
export class AdminProvidersComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  isDtInitialized: boolean = false;

  dtOptions: DataTables.Settings = {};

  sps: any = [];

  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private spList: AdminServices, private local : LocalService) {}

  ngOnInit(): void {
    this.local.admin = true;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 4,
    };

    this.spList.getSpList().subscribe((data: any) => {
      this.sps = data;
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
        this.spList.banSp(id).subscribe((data: any) => {
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
      confirmButtonText: 'Confirm unban!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('', 'User Is Unbanned', 'success');
        this.spList.unbanSp(id).subscribe((data) => {
          this.ngOnInit();
        });
      }
    });
  }
}
