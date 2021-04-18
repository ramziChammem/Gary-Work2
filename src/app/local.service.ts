import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }
  adminSignedIn : boolean;
admin : boolean = false;
  role : string = "guest"
  email : string 
  changeRole (newRole) {
    this.role = newRole;
    
  }
  sv : boolean = false
  pick : any = ""
}
