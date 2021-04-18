import { Component } from '@angular/core';
// import { LocalService } from './local.service';
import {LocalStorageService} from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private localStorage: LocalStorageService) {}

  role: string ;
  ngOnInit() {
    this.role = this.localStorage.getItem('role')
  }
  title = 'gary-work';
}
