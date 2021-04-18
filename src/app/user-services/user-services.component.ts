import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalService } from '../local.service';
import { Router } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ServicesService } from '../services/services.service';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-user-services',
  templateUrl: './user-services.component.html',
  styleUrls: ['./user-services.component.scss'],
  providers: [NgbRatingConfig],
})
export class UserServicesComponent implements OnInit {
  map: boolean = false;
  inp: string;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  services: any = [];
  username: string;
  list: any;
  ha : any ; 
  data: any;
  backup: any = [];
  location: any;
  reviews: any = [];
  n: any = '';
  l: any = '';
  p: any = this.local.pick;
  labelColor = 'black';
  labelText = 'Hello';
  fontSize: '50px';
  fontWeight: 'bold';
  labelBackground = 'yellow';
  svMail: string = localStorage.getItem('svMail');
  constructor(
    private http: HttpClient,
    private local: LocalService,
    private serviceList: ServicesService,
    private router: Router,
    config: NgbRatingConfig,
    private mapsAPILoader: MapsAPILoader
  ) {
    config.max = 5;
    config.readonly = true;
    this.router.events.subscribe((res) => {
      if (res['url'] !== res['urlAfterRedirects']) {
        this.local.pick = '';
        this.ngOnInit();
      }
    });
  }
  role: string = this.local.role;
  ngOnInit(): void {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();
    });

    this.list = [];
    this.services = [];
    this.list = [];
    this.getServices();
    this.getProfessions();
    this.getRating();
  }

  // Get Current Location Coordinates
  public setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  markerDragEnd($event) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }


  onChooseloc(event) {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results, status) => {
        if (status === 'OK' && results.length) {
          if (results[0]) {
            this.zoom = 12;
            this.address = results[0].formatted_address;
          }
        } else {
          this.latitude = parseFloat(localStorage.getItem('lat'));
          this.longitude = parseFloat(localStorage.getItem('lng'));
        }
      }
    );
  }

  onLocChange(event) {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }



  getServices() {
    this.serviceList.getServiceProviders().subscribe((data) => {
      this.services = data;
      this.services = this.services.filter((el) => {
        return (
          el.isBanned === false &&
          el.email !== this.svMail &&
          el.isDeclined === false
        );
      });
     this.ha =  this.services 
      this.ha.map((e)=>{
        this.serviceList.getImage(e.profession).subscribe((data)=>{
          e.img = data["image"]
        })
      })
      this.backup = this.ha;
      this.filterServiceByProfession(localStorage.getItem("pick"));
    });
  }

  getProfessions() {
    this.serviceList.getProfessions().subscribe((data) => {
      this.list  = data 
    });
  }
  getRating() {
    for (var i = 0; i < this.services.length; i++) {
      this.serviceList.getRating(this.services[i].email).subscribe((data) => {
        this.reviews = data;
        var totalRate = 0;
        for (var j = 0; j < this.reviews.length; j++) {
          totalRate += this.reviews[j].rate;
        }
        this.services[i].rate = totalRate / this.reviews.length;
      });
    }
  }
  goSvProfile(svMail) {
    localStorage.setItem('halimMail', svMail);
    this.router.navigateByUrl('/fisitor');
  }
  filterServiceByName(val) {
    this.n = val.toUpperCase();
    this.services = this.backup;
    var newArray = [];
    this.services.map((e) => {
      val = val.toUpperCase();
      var name = e.fullName.toUpperCase();
      var profession = e.profession.toUpperCase();
      var location = e.location.toUpperCase();
      if (
        name.includes(val) &&
        profession.includes(this.p) &&
        location.includes(this.l)
      ) {
        newArray.push(e);
      }
    });
    this.services = newArray;
  }

  filterServiceByProfession(val) {
    var newArr = [];
    if (val === 'all') {
      this.services = this.backup;
      this.services.map((e) => {
        var name = e.fullName.toUpperCase();
        var location = e.location.toUpperCase();
        if (name.includes(this.n) && location.includes(this.l)) {
          newArr.push(e);
        }
      });
      this.services = newArr;
    } else {
      this.p = val.toUpperCase();
      this.services = this.backup;
      this.services.map((e) => {
        val = val.toUpperCase();
        var name = e.fullName.toUpperCase();
        var profession = e.profession.toUpperCase();
        var location = e.location.toUpperCase();
        if (
          name.includes(this.n) &&
          profession.includes(val) &&
          location.includes(this.l)
        ) {
          newArr.push(e);
        }
      });
      this.services = newArr;
    }
  }

  viewMap() {
    this.map = !this.map;
  }

  dropLoc(val) {
    this.l = val.toUpperCase();
    this.services = this.backup;
    var newArray = [];

    this.services.map((e) => {
      val = val.toUpperCase();
      let reg = new RegExp(val, 's');
      var name = e.fullName.toUpperCase();
      var profession = e.profession.toUpperCase();
      var location = e.location.toUpperCase();
      if (
        name.includes(this.n) &&
        profession.includes(this.p) &&
        location.includes(val)
      ) {
        newArray.push(e);
      }
    });
    this.services = newArray;
  }
}
