import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newsignup',
  templateUrl: './newsignup.component.html',
  styleUrls: ['./newsignup.component.scss'],
})
export class NewsignupComponent implements OnInit {
  constructor() {}
  spSignUp: boolean = false;
  userSignup: boolean = false;
  container: any;
  ngOnInit(): void {}

  signupSp() {
    this.spSignUp = true;
    document.querySelector('.container').classList.add('sign-up-mode');
  }
  signupUser() {
    this.userSignup = true;
    document.querySelector('.container').classList.add('sign-up-mode');
  }

  signin() {
    this.userSignup = false;
    this.spSignUp = false;
    document.querySelector('.container').classList.remove('sign-up-mode');
  }
}
