import { Component, OnInit } from '@angular/core';
import {LocalService} from '../../../local.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss']
})
export class AdminNavComponent implements OnInit {

  constructor(public local : LocalService) { }

  ngOnInit(): void {
  }

}
