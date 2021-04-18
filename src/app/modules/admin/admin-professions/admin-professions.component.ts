import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { AdminServices } from '../../../services/admin.service';
import { ProfileService } from '../../../services/profile.service';
import { ServicesService } from '../../../services/services.service';
import Swal from 'sweetalert2';
import { LocalService } from '../../../local.service';


@Component({
  selector: 'app-admin-professions',
  templateUrl: './admin-professions.component.html',
  styleUrls: ['./admin-professions.component.scss'],
})
export class AdminProfessionsComponent implements OnInit {
  image: any;
  services: Array<Object> = [];
  profession: any;
  id: any;
  img: any;
  pro: any;
  constructor( private local : LocalService,
    private adminServices: AdminServices,
    private profileServices: ProfileService,
    private servicesService: ServicesService
  ) {}

  ngOnInit(): void {
    this.local.admin = true;
    this.getProfessions();
    //  this.addServices()
  }

  getProfessions() {
    this.servicesService.getProfessions().subscribe((data: Object[]) => {
      this.services = data;
    });
  }
  takeID(id, img, pro) {
    this.id = id;
    this.img = img;
    this.pro = pro;
  }
  addServices(profession) {
    var services = {
      profession: profession,
      image: this.image,
    };
    this.adminServices.addService(services).subscribe((data) => {
      Swal.fire('added!', 'success');
      this.image = '';
      this.profession = '';
      this.ngOnInit();
    });
  }
  imgUpload(img) {
    console.log('IMG FROM VER==> ', img.target.files[0]);
    var formData = new FormData();
    formData.append('img', img.target.files[0]);
    this.profileServices.ImageUpload(formData).subscribe((resp) => {
      this.image = resp['msg'].url;
      this.img = resp['msg'].url;
    });
  }
  updateImageandService(s) {
    if (s !== this.pro) {
      this.pro = s;
    }

    this.adminServices
      .updateImageandService(this.id, this.img, this.pro)
      .subscribe((data) => {
        this.services = data['data'];
        Swal.fire('', data['success'], 'success');
        this.ngOnInit();
      });
  }

 
    deleteService(id) {
      console.log(id);
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will permanently delete this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.adminServices.deleteService(id).subscribe((data) => {
            Swal.fire('Deleted!', 'deleted', 'success');
            this.ngOnInit();
          });
        }
      });
    }

}

