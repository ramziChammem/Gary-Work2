import { Component, OnInit } from '@angular/core';
declare var Rellax: any;
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    var rellax = new Rellax('.rellax');
  }


  scroll(id) {
    let el = document.getElementById(id);
    el.scrollIntoView();
  }
}
