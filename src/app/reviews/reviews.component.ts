import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { GaryService } from '../gary.service';
import { ProfileService } from '../services/profile.service';
import * as moment from 'moment';
@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
  providers: [NgbRatingConfig],
})
export class ReviewsComponent implements OnInit {
  @Input() spReviews: any;
  constructor(
    private http: HttpClient,
    config: NgbRatingConfig,
    private GaryService: GaryService,
    private profileServices: ProfileService
  ) {
    config.max = 5;
    config.readonly = true;
  }

  spEmail: string = localStorage.getItem('svMail');
  visitorEmail: string = localStorage.getItem('halimMail');
  userId: string = localStorage.getItem('id');
  isUser: string = localStorage.getItem('visitor');
  currentRate: number;
  guest: string = localStorage.getItem('id');
  allRates: any = [];
  ratesObj: any = {};
  oneStarPercent: string = '0%';
  twoStarPercent: string = '0%';
  threeStarPercent: string = '0%';
  fourStarPercent: string = '0%';
  fiveStarPercent: string = '0%';
  totalPerc: number = 0;

  getReviews() {
    var totalReview = 0;
    for (var i = 0; i < this.spReviews.length; i++) {
      this.allRates.push(this.spReviews[i].rate);
      this.spReviews[i].updatedAt = moment(this.spReviews[i].updatedAt).format(
        'LLL'
      );
      totalReview += this.spReviews[i].rate;
    }
    for (var y = 0; y < this.allRates.length; y++) {
      if (!this.ratesObj[this.allRates[y]]) {
        this.ratesObj[this.allRates[y]] = 1;
      } else {
        this.ratesObj[this.allRates[y]]++;
      }
    }
    this.currentRate = totalReview / this.spReviews.length;

    if (this.allRates.includes(1)) {
      this.totalPerc = (this.ratesObj[1] / this.allRates.length) * 100;
      this.oneStarPercent = this.totalPerc.toString() + '%';
    }
    if (this.allRates.includes(2)) {
      this.totalPerc = (this.ratesObj[2] / this.allRates.length) * 100;
      this.twoStarPercent = this.totalPerc.toString() + '%';
    }
    if (this.allRates.includes(3)) {
      this.totalPerc = (this.ratesObj[3] / this.allRates.length) * 100;
      this.threeStarPercent = this.totalPerc.toString() + '%';
    }
    if (this.allRates.includes(4)) {
      this.totalPerc = (this.ratesObj[4] / this.allRates.length) * 100;
      this.fourStarPercent = this.totalPerc.toString() + '%';
    }
    if (this.allRates.includes(5)) {
      this.totalPerc = (this.ratesObj[5] / this.allRates.length) * 100;
      this.fiveStarPercent = this.totalPerc.toString() + '%';
    }

    document.getElementById('bar1').style.width = this.oneStarPercent;
    document.getElementById('bar2').style.width = this.twoStarPercent;
    document.getElementById('bar3').style.width = this.threeStarPercent;
    document.getElementById('bar4').style.width = this.fourStarPercent;
    document.getElementById('bar5').style.width = this.fiveStarPercent;
  }

  ngOnInit(): void {
    this.getReviews();
    if (this.userId) {
      this.newReview();
    }
  }

  newReview() {
    this.profileServices
      .getServiceProviderData(this.visitorEmail)
      .subscribe((data) => {
        this.spReviews = data['reviews'];
      });
  }

  addReview(serviceProviderName, userName, review) {
    if (!serviceProviderName || !userName || !review) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please fill all the fields',
      });
    } else {
      this.http
        .post(
          'http://localhost:3000/api/review/addReview',
          {
            serviceProviderName: serviceProviderName,
            userName: userName,
            review: review,
          },
          { responseType: 'json' }
        )
        .subscribe((data) => {
          this.spReviews += data;

          Swal.fire('Good job!', data['success'], 'success');
        });
    }
  }
  deleteReview(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will permanently delete this message!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http
          .delete('http://localhost:3000/api/review/deleteReview/' + id)
          .subscribe((data): any => {
            this.spReviews.filter((review) => review._id !== id);
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            this.ngOnInit();
          });
      }
    });
  }
}
