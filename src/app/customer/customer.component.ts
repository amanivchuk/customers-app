import {Component, OnInit} from '@angular/core';
import {Customer} from './Customer';
import {CustomerService} from './customer.service';
import Swal from 'sweetalert2';
import {tap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {ModalService} from './detail/modal.service';
import {AuthService} from '../users/auth.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers: Customer[];
  paginator: any;
  customerSelected: Customer;

  constructor(
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    public modalService: ModalService,
    public authService: AuthService
  ) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

      this.customerService.getCustomers(page)
        .pipe(
          tap((response: any) => {
            console.log('Tap 3');
            (response.content as Customer[]).forEach(customer => {
              console.log(customer.email);
            });
          })
        )
        .subscribe(response => {
          this.customers = response.content as Customer[];
          this.paginator = response;
        });
    });

    this.modalService.notificationUpload.subscribe(customer => {
      this.customers.map(customerOrignal => {
        if(customer.id == customerOrignal.id){
          customerOrignal.photo = customer.photo;
        }
        return customerOrignal;
      })
    })
  }

  delete(customer: Customer): void {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: `Customer with email ${customer.email} will be delete`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.customerService.delete(customer.id).subscribe(result => {
          this.customers = this.customers.filter(ccust => ccust !== customer);
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Customer deleted successfully!',
            'success'
          );
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        );
      }
    });

  }


  openModal(customer: Customer) {
    this.customerSelected = customer;
    this.modalService.openModal();
  }
}
