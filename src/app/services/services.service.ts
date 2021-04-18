import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  getServiceProviders() {
    return this.http.get('http://localhost:3000/api/serviceProviderList/services');
  }

  getProfessions(): Observable<Object> {
    return this.http.get('http://localhost:3000/api/professions/getProfessions')
  }
  getRating(i) {
  return this.http.get( `http://localhost:3000/api/review/getReviews/${i}`)
  }
  getImage(profession){
    return this.http.get( `http://localhost:3000/api/professions/${profession}`)
  }
   }


  


