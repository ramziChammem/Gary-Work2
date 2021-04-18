import { Component, OnInit } from '@angular/core';
import { LocalService } from "../../local.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-service-section',
  templateUrl: './service-section.component.html',
  styleUrls: ['./service-section.component.scss']
})
export class ServiceSectionComponent implements OnInit {

  constructor(private local : LocalService , private router : Router) { }

  ngOnInit(): void {
   console.log('home')
  }
takeMeTo(profession: String){
  this.local.pick = profession
  localStorage.setItem("pick" , this.local.pick)
  this.router.navigateByUrl("userServices")
  console.log('dddd' , this.local.pick)
}
more(){
  localStorage.setItem("pick" , "")
  this.router.navigateByUrl("userServices")
}
}
