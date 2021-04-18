import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LocalService } from '../local.service';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProfileService } from '../services/profile.service';
import { UserProfileService } from '../services/user-profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  data: any;
  spProfileImg: any;
  userProfileImg: string;

  constructor(
    public local: LocalService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private service: ProfileService,
    private services: UserProfileService,
    private cdRef: ChangeDetectorRef
  ) {
    router.events.subscribe(() => {
      this.refreshState();
      this.ngOnInit();
    });
  }

  userId: String = '';
  serviceProviderEmail: String = '';

  refreshState() {
    this.serviceProviderEmail = this.getServiceProviderEmail();
    this.userId = this.getUserId();
  }

  getUserId(): String {
    return this.localStorageService.getItem('id');
  }

  getServiceProviderEmail(): String {
    return this.localStorageService.getItem('svMail');
  }

  logout(): void {
    // Logging out from user
    this.cdRef.detectChanges();
    if (this.userId) {
      this.localStorageService.removeItem('id');
      this.localStorageService.removeItem('userName');
      this.localStorageService.removeItem('apUserName');
      this.localStorageService.removeItem('token');
      this.localStorageService.removeItem('halimMail');
      this.userId = '';
    }

    // Logging out from Service Provider
    if (this.serviceProviderEmail) {
      this.localStorageService.removeItem('svMail');
      this.localStorageService.removeItem('spEmail');
      this.localStorageService.removeItem('token');
      this.localStorageService.removeItem('halimMail');
      this.serviceProviderEmail = '';
    }
    Swal.fire('', 'You Are Logged Out!', 'success');
    this.router.navigate(['/']);
  }

  getServiceProviderImg(): void {
    this.service
      .getServiceProviderData(this.serviceProviderEmail)
      .subscribe((res) => {
        this.spProfileImg = res['data']['imageUrl'];
        this.cdRef.detectChanges();
      });
  }

  getUserImg(): void {
    this.services.getUserData(this.userId).subscribe((res) => {
      this.userProfileImg = res['imageUrl'];

      this.cdRef.detectChanges();
    });
  }

  ngOnInit(): void {
    this.refreshState();

    if (this.serviceProviderEmail) {
      this.getServiceProviderImg();
    }

    if (this.userId) {
      this.getUserImg();
    }
  }

  scroll(id) {
    let el = document.getElementById(id);
    el.scrollIntoView();
  }

  redirectSp() {
    this.router.navigateByUrl('spProfile');
  }
  servicessss(){
    localStorage.setItem('pick' , '')
  }
}
