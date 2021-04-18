import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

import { LocalService } from '../local.service';
import * as moment from 'moment';
import { ProfileService } from '../services/profile.service';
import { io } from 'socket.io-client';

const SOCKET_ENDPOINT = 'localhost:3000';
import { LiveMessages } from '../live-chat/live-chat.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-sp-profile',
  templateUrl: './sp-profile.component.html',
  styleUrls: ['./sp-profile.component.scss'],
})
export class SpProfileComponent implements OnInit {
  serviceProviderReviews: any;
  socket;
  message = {
    messageBody: '',
    userId: localStorage.getItem('id'),
    spId: localStorage.getItem('halimMail'),
    isSp: !false,
  };
  isChatClicked: boolean = false;
  allMsg: any = [];
  sendedMessages: any = [];
  recievedMessages: any = [];
  constructor(
    private LiveMessages: LiveMessages,
    private http: HttpClient,
    private local: LocalService,
    private profileServices: ProfileService
  ) {}
  name: any = localStorage.getItem('apUserName');
  spData: any;
  appointmentsList: any;
  token: string = localStorage.getItem('token');
  spEmail: string;
  visitor: boolean = false;
  visitor1: boolean = false;
  svMail: string;
  spPosts: any;
  notifications: number = 0;
  editable: boolean = false;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  adress: string;
  previousPassword: string;
  currentPassword: string;
  confirmPassword: string;
  imageUrl: string;
  currentConversation: any = [];

  ngOnInit(): void {
    if (localStorage.getItem('visitor') === 'yes') {
      this.visitor = true;
      this.visitor1 = false;
    } else {
      this.visitor = false;
      this.visitor1 = true;
    }
    this.svMail = localStorage.getItem('svMail');

    this.profileServices
      .getServiceProviderData(this.svMail)
      .subscribe((data) => {
        this.serviceProviderReviews = data['reviews'];
        this.spData = data['data'];
        this.imageUrl = data['data']['imageUrl'];
        this.getAppointments();
        this.profileServices
          .getServiceProviderPosts(this.spData._id)
          .subscribe((data) => {
            this.spPosts = data;
            this.spPosts = this.spPosts.reverse();
            for (var i = 0; i < this.spPosts.length; i++) {
              this.spPosts[i].updatedAt = moment(
                this.spPosts[i].updatedAt
              ).format('LLL');
            }
          });
      });
    this.setupSocketConnection();
    this.getAllMessages();
  }
  getConversation() {
    this.LiveMessages.getConversation(
      this.message.spId,
      this.message.userId
    ).subscribe((data: any[]) => {
      this.currentConversation = data;
    });
  }

  getAllMessages() {
    this.LiveMessages.getAllMessages().subscribe((data: any[]) => {
      this.allMsg = data;
      for (var i = 0; i < this.allMsg.length; i++) {
        this.allMsg[i].createdAt = moment()
          .add(this.allMsg[i].createdAt)
          .calendar();
      }
    });
  }
  changeChatClick() {
    this.isChatClicked = !this.isChatClicked;
  }
  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT);
    this.socket.on('message-broadcast', (data: string = this.allMsg) => {
      if (data) {
        this.getAllMessages();
      }
    });
  }
  SendMessage() {
    this.socket.emit('message', this.message.messageBody);

    this.LiveMessages.sendAMessage(this.message).subscribe((response) => {
      this.getAllMessages();
    });
    this.message.messageBody = '';
  }
  imgUpload(img) {
    var formData = new FormData();
    formData.append('img', img.target.files[0]);
    this.profileServices.ImageUpload(formData).subscribe((resp) => {
      this.imageUrl = resp['msg'].url;
    });
  }

  check: boolean = false;
  posts: boolean = true;
  reviews: boolean = false;
  settings: boolean = false;
  appointments: boolean = false;
  Security: boolean = false;

  post() {
    this.posts = true;
    this.reviews = false;
    this.settings = false;
    this.appointments = false;
    this.Security = false;
  }
  review() {
    this.posts = false;
    this.reviews = true;
    this.settings = false;
    this.appointments = false;
    this.Security = false;
  }
  appointment() {
    this.posts = false;
    this.reviews = false;
    this.settings = false;
    this.appointments = true;
    this.Security = false;
  }

  setting() {
    this.posts = false;
    this.reviews = false;
    this.settings = true;
    this.appointments = false;
    this.Security = false;
  }
  security() {
    this.posts = false;
    this.reviews = false;
    this.settings = false;
    this.appointments = false;
    this.Security = true;
  }

  getAppointments() {
    this.profileServices
      .getSericeProviderAppointments(this.spData._id)
      .subscribe((data) => {
        this.appointmentsList = data;
        this.notifications = this.appointmentsList.length;
      });
  }

  goToAppointments() {
    this.posts = false;
    this.reviews = false;
    this.appointments = true;
    this.settings = false;
    this.Security = false;
  }

  displayForm() {
    this.editable = true;
  }
  Add(title, description, date, id) {
    var adding = {
      title: title,
      description: description,
      date: date,
      image: this.imageUrl,
      spId: id,
    };
    if (title === '' && description === '' && date === '') {
      alert('fill all inputs');
    } else {
      this.profileServices.addPost(adding).subscribe((data) => {
        Swal.fire('added!', 'success');
        this.ngOnInit();
      });
    }
    this.editable = false;
  }
  deletePost(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will permanently delete this post!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.profileServices.deletePost(id).subscribe((data) => {
          Swal.fire('Deleted!', 'Your post has been deleted.', 'success');
          this.ngOnInit();
        });
      }
    });
  }

  updateServiceProviderDetails(
    firstName,
    lastName,
    fullName,
    phoneNumber,
    location
  ) {
    this.profileServices
      .updateServiceProviderData(
        firstName,
        lastName,
        fullName,
        phoneNumber,
        location,
        this.spData._id
      )
      .subscribe((data) => {
        this.spData = data['data'];
        Swal.fire('', data['success'], 'success');
      });
  }

  updateServiceProviderPassword(currentPassword, newPassword, confirmPassword) {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please enter your fields',
      });
    } else if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'make sure to confirm your password correctly',
      });
    } else if (newPassword.length < 8) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'your password must be at least 8 characters',
      });
    } else {
      this.profileServices
        .updatePassword(
          currentPassword,
          newPassword,
          confirmPassword,
          this.spData._id
        )
        .subscribe((data) => {
          if (data['err']) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data['err'],
            });
          } else {
            Swal.fire('', data['success'], 'success');
          }
        });
    }
  }
  approveAppointment(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will approve this appointement!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Approved!',
          'Your appointment has been approved.',
          'success'
        );
        this.http
          .put('http://localhost:3000/api/appointment/approve/' + id, {
            isApproved: true,
          })
          .subscribe((data) => {
            this.getAppointments();
          });
      }
    });
  }
  declineAppointment(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will permanently decline this appointment!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, decline it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Declined!',
          'Your appointment has been declined.',
          'success'
        );
        this.http
          .put('http://localhost:3000/api/appointment/decline/' + id, {
            isDeclined: true,
          })
          .subscribe((data) => {
            this.getAppointments();
          });
      }
    });
  }
  updateImage(imageUrl) {
    if (!imageUrl) {
      return;
    }

    this.profileServices
      .updateImage(imageUrl, this.spData._id)
      .subscribe((data) => {
        this.spData.imageUrl = data['data'];
        Swal.fire('', data['success'], 'success').then(() => {
          window.location.reload();
        });
      });
  }
}
