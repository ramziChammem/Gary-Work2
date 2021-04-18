import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  constructor(private http: HttpClient) {}
  name:String;
  phone:Number;
  email:String;
  message:String;

  ngOnInit(): void {}
send(name,phone, email, message) {
  

   if(typeof (phone) !== 'number') {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'please fill in a valid phone number',
    })
  }


  this.http.post("http://localhost:3000/api/contactus" ,    {
  name: name,
  phone: phone,
  email: email,
  message: message
},
{ responseType: 'text' }).subscribe((data) => {   Swal.fire(
  "",
  "Message Sent",
  'success'
  )
  this.name = ""; 
  this.phone = null; 
  this.email = ""; 
  this.message = "";
})
 
}
}

