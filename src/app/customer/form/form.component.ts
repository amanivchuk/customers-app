import {Component, OnInit} from '@angular/core';
import {Customer} from '../Customer';
import {CustomerService} from '../customer.service';
import {Router, ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';
import {Region} from '../Region';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  customer: Customer = new Customer();
  title: string = 'Create new customer';

  regions: Region[];

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
    this.customerService.getRegions().subscribe(result => {
      this.regions = result;
    })
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

  compareRegion(o1: Region, o2: Region): boolean{
    if(o1 === undefined && o2 === undefined){
      return true;
    }

    return o1 == null || o2==null || o1 === undefined || o2=== undefined ? false: o1.id===o2.id;
  }
}
