import { Component, OnInit } from '@angular/core';
import {Customer} from './Customer';
import {CUSTOMERS} from './customer.json';
import {CustomerService} from './customer.service';
import Swal from 'sweetalert2';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers: Customer[]

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getCustomers()
      .pipe(
        tap(customers => {
          console.log('Tap 3');
          customers.forEach(customer => {
            console.log(customer.email);
          });
        })
      )
      .subscribe(result => {
      this.customers = result;
    })
  }

  delete(customer: Customer): void{

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

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
          this.customers = this.customers.filter(ccust => ccust !== customer)
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Customer deleted successfully!',
            'success'
          )
        })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })

  }


}
