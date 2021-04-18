import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http : HttpClient) { }

  getServiceProviderData(svMail) {
    return this.http.get(`http://localhost:3000/api/serviceProvider/${svMail}`)
  }

  getServiceProviderPosts(id) {
    return this.http.get(`http://localhost:3000/api/posts/${id}`)
  }
  
  getSericeProviderAppointments(id) {
    return this.http.get(`http://localhost:3000/api/appointment/${id}`)
  }
  
  submitAppointment(payload : object) {
  return this.http.post('http://localhost:3000/api/appointment', payload)
  }
  // deleteAppointment(id) {
  //   return this.http.delete(`http://localhost:3000/api/appointment/${id}`)
  // }
  
  ImageUpload(formData : object) {
    return this.http.post('http://localhost:3000/upload', formData)
  }
  
  addPost(payload) {
    return this.http.post("http://localhost:3000/api/posts", payload)
  }

  deletePost(id) {
    return this.http.delete(`http://localhost:3000/api/posts/${id}`)
  }
 
 
  updateServiceProviderData(firstName,lastName, fullName, phoneNumber,location, id ) {
    return this.http.put(`http://localhost:3000/api/serviceProvider/updateServiceProviderData/${id}`, { firstName, lastName, fullName, phoneNumber, location}, { responseType: 'json' })
  }


updatePassword(currentPassword, newPassword, confirmPassword, id) {
  return this.http.patch(`http://localhost:3000/api/serviceProvider/updateServiceProviderPassword/${id}`, {currentPassword, newPassword, confirmPassword}, { responseType: 'json' })
}

updateImage(imageUrl, id) {
  return this.http.put(`http://localhost:3000/api/serviceProvider/updateImage/${id}`, {imageUrl}, { responseType: 'json' })
}
}
