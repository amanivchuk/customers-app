import {Component, Input, OnInit} from '@angular/core';
import {Customer} from '../Customer';
import {CustomerService} from '../customer.service';
import swal from 'sweetalert2';
import {HttpEventType} from '@angular/common/http';
import {ModalService} from './modal.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  title: string = "Customer detail"

  @Input()
  customer: Customer;

  selectPhotoFile: File;
  progress: number = 0;

  constructor(
    private customerService: CustomerService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    // this.activatedRoute.paramMap.subscribe(params => {
    //    let id: number = +params.get('id');
    //    if(id){
    //      this.customerService.getCustomer(id).subscribe(customer => {
    //        this.customer = customer;
    //      })
    //    }
    // })
  }

  selectPhoto(event: Event) {
    // @ts-ignore
    this.selectPhotoFile = event.target.files[0];
    this.progress = 0;
    console.log(this.selectPhotoFile);
    if(this.selectPhotoFile.type.indexOf('image') < 0){
      swal.fire('Error selected photo', 'Only photo file!', 'error');
      this.selectPhotoFile = null;
    }
  }

  uploadPhoto() {
    if(!this.selectPhotoFile){
      swal.fire('Error upload', 'Only photo file', 'error');
    } else {
      this.customerService.uploadPhoto(this.selectPhotoFile, this.customer.id).subscribe(result => {
        if(result.type === HttpEventType.UploadProgress){
          this.progress = Math.round((result.loaded / result.total)*100);
        } else if(result.type === HttpEventType.Response){
          let response: any = result.body;
          this.customer = response.customer as Customer;

          this.modalService.notificationUpload.emit(this.customer);

          swal.fire('Photo upload successfully!', `response.message`, 'success' );
        }
      })
    }
  }

  openModal(){
    this.modalService.openModal();
    this.selectPhotoFile = null;
    this.progress = 0;
  }

  closeModal() {
    this.modalService.closeModal();
  }
}
