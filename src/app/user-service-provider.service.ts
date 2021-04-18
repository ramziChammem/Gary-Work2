import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceProviderService {
  apiURL: string = 'http://localhost:3000/api/user/register';
  constructor(private httpClient: HttpClient) { }
  // register(){
  //   return this.httpClient.post(this.apiURL)
  // }
}
