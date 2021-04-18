import { Component, OnInit } from '@angular/core';
import { AdminServices } from '../../../services/admin.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import {LocalService} from '../../../local.service';
@Component({
  selector: 'app-admin-messages',
  templateUrl: './admin-messages.component.html',
  styleUrls: ['./admin-messages.component.scss']
})
export class AdminMessagesComponent implements OnInit {
  constructor(private contactMessages: AdminServices, private local: LocalService) {}

  messages = [];

  moment: any = moment;

  ngOnInit() {
    this.local.admin = true;
    this.contactMessages.getMessages().subscribe((data: any[]) => {
      this.messages = data;
    });
  }

  deleteOne(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will permanently delete this message!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        this.contactMessages.deleteMessage(id).subscribe((data): any => {
          this.messages = this.messages.filter((msg) => msg.userId !== id);
        });
      }
    });
  }

  deleteAll() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete All!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.contactMessages.deleteAll().subscribe(() => {
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          this.ngOnInit();
        });
      }
    });
  }

}
