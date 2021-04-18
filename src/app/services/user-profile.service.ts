import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http : HttpClient) { }

  getUserData(id) {
    return this.http.get(`http://localhost:3000/api/user/${id}`)
  }

  ImageUpload(formData : object) {
    return this.http.post('http://localhost:3000/upload', formData)
  }
  updateUserData(id, firstName, lastName,userName,phoneNumber, location){
    return this.http.put(`http://localhost:3000/api/user/updateUserData/${id}`, {firstName, lastName, userName, phoneNumber, location}, { responseType: 'json' })
  }



updatePassword( id, currentPassword, newPassword, confirmPassword) {
  return this.http.patch(`http://localhost:3000/api/user/updatePassword/${id}`, {currentPassword, newPassword, confirmPassword}, { responseType: 'json' })
}
getUserAppointments(id) {
  return this.http.get(`http://localhost:3000/api/appointment/getUserApts/${id}`)
}

updateUserImage(imageUrl, id) {
  return this.http.put(`http://localhost:3000/api/user/updateUserImage/${id}`, {imageUrl}, { responseType: 'json' })
}
}
