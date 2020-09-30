import {Component, OnInit} from '@angular/core';
import {Customer} from '../Customer';
import {CustomerService} from '../customer.service';
import {Router, ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  customer: Customer = new Customer();
  title: string = 'Create new customer';

  errors: string[];

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.findCustomer();
  }

  create(): void {
    this.customerService.create(this.customer).subscribe(result => {
        this.router.navigate(['/customers']);
        swal.fire('New Customer Created', `Customer :  ${result.email} created!`, 'success');
      },
      err => {
        this.errors = err.error.errors as string[];
        console.error(err.status);
        console.error(err.error.errors);
      }
    );
  }

  findCustomer(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.customerService.getCustomer(id).subscribe((result) => {
          this.customer = result;
        });
      }
    });
  }

  update(): void {
    this.customerService.update(this.customer).subscribe(json => {
      this.router.navigate(['/customers']);
      swal.fire('Customer updated', `${json.message}:  ${json.customer.email}`, 'success');
    },
      err => {
        this.errors = err.error.errors as string[];
        console.error(err.status);
        console.error(err.error.errors);
      });
  }
}
