import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminServices {
  apiURL: string = 'http://localhost:3000/api/contactus';

  constructor(private httpClient: HttpClient) {}

  public getMessages() {
    return this.httpClient.get(this.apiURL);
  }

  public deleteMessage(id) {
    return this.httpClient.delete(this.apiURL + '/' + id);
  }

  public deleteAll() {
    return this.httpClient.delete(this.apiURL);
  }


  public getSpList() {
    return this.httpClient.get('http://localhost:3000/api/serviceProviderList/services');
  }

  public getUsersList() {
    return this.httpClient.get('http://localhost:3000/api/user/users')
  }
  public banUser(id) {
    return this.httpClient.put(`http://localhost:3000/api/admin/ban/${id}`, {})
  }

  public banSp(id) {
    return this.httpClient.put(`http://localhost:3000/api/admin/ban/sp/${id}`, {})
  }

  public unbanUser(id) {
    return this.httpClient.put(`http://localhost:3000/api/admin/unban/${id}`, {})
  }
  public unbanSp(id) {
    return this.httpClient.put(`http://localhost:3000/api/admin/sp/unban/${id}`, {})
  }
  

public verifyAccount(id) {
  return this.httpClient.put(`http://localhost:3000/api/admin/verify/${id}`, {})
}  
public declineAccount(id) {
  return this.httpClient.put(`http://localhost:3000/api/admin/decline/${id}`, {})
} 

public addService(payload){
return this.httpClient.post("http://localhost:3000/api/professions/addProfession",payload)}

public updateImageandService(id,image,profession){
  return this.httpClient.put(`http://localhost:3000/api/professions/updateImageandServices/${id}`,{image,profession},{ responseType: 'json' })
}
public deleteService(id){
  return this.httpClient.delete(`http://localhost:3000/api/professions/${id}`)
}
}


