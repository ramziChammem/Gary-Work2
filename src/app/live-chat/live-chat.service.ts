import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LiveMessages {
  apiURL: string = 'http://localhost:3000/api/';
  constructor(private httpClient: HttpClient) {}

  public getAllMessages() {
    return this.httpClient.get(this.apiURL + 'messages');
  }
  public sendAMessage(body) {
    return this.httpClient.post(this.apiURL + 'messages/sendMessage', body);
  }
  public getConversation(spId, userId) {
    return this.httpClient.get(this.apiURL + 'messages/' + spId + '/' + userId);
  }
}
