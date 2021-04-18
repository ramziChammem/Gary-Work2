import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor() { }

    serviceProvider : boolean = false;
    UserIsAuthenticated() {
      return !!localStorage.getItem('svMail');
    }


    
}