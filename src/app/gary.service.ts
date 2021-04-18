import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GaryService {
  apiURL: string = 'http://localhost:3000/api/';
  constructor(private httpClient: HttpClient) {}

  public getData(token) {
    return this.httpClient.get(
      this.apiURL + 'serviceProvider/profile/' + token
    );
  }
  public addReview(body) {
    return this.httpClient.post(this.apiURL + 'review/addReview', body);
  }
  public getReviews(email) {
    return this.httpClient.get(this.apiURL + 'review/getReviews/' + email);
  }
}
