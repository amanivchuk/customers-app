import { Component, OnInit } from '@angular/core';
import {Bill} from '../model/Bill';
import {CustomerService} from '../../customer/customer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
import {BillService} from '../bill.service';
import {Product} from '../model/Product';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import {ItemFactura} from '../model/ItemFactura';
import swal from 'sweetalert2';
import {AuthService} from '../../users/auth.service';


@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  title: string = 'Create new Bill';
  bill: Bill = new Bill();

  myControl = new FormControl();
  productsOptions: Observable<Product[]>;

  constructor(
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    private billService: BillService,
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let customerId = +params.get('customerId');
      this.customerService.getCustomer(customerId).subscribe(result => {
        this.bill.customer = result;
      });
    })

    this.productsOptions = this.myControl.valueChanges.pipe(
      map(value => typeof value === 'string' ? value: value.name),
      flatMap(value => value ? this._filter(value) : [])
    );
  }

  _filter(value: string): Observable<Product[]>{
    const filterValue = value.toLowerCase();

    return this.billService.filterProducts(filterValue);
  }

  showName(product?: Product): string | undefined{
    return product? product.name: undefined;
  }

  selectedProduct(event: MatAutocompleteSelectedEvent): void {
    let product = event.option.value as Product;

    if(this.existItem(product.id)){
      this.incrementQuantity(product.id);
    }else{
      let newItem = new ItemFactura();
      newItem.product = product;
      this.bill.items.push(newItem);
    }

    this.myControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  updateQuantity(id: number, event: Event): void {
    // @ts-ignore
    let quantity: number = event.target.value as number;

    if(quantity == 0){
      return this.removeItemFactura(id);
    }

    this.bill.items = this.bill.items.map((item: ItemFactura) => {
      if(id === item.product.id){
        item.quantity = quantity;
      }
      return item;
    });
  }

  existItem(id: number): boolean{
    let exist = false;
    this.bill.items.forEach((item:ItemFactura) => {
      if(id === item.product.id){
        exist = true;
      }
    })
    return exist;
  }

  incrementQuantity(id: number): void{
    this.bill.items = this.bill.items.map((item: ItemFactura) => {
      if(id === item.product.id){
        ++item.quantity;
      }
      return item;
    });
  }

  removeItemFactura(id: number): void {
    this.bill.items = this.bill.items.filter((item: ItemFactura) => id !== item.product.id);
  }

  create(billForm): void {

    if(this.bill.items.length == 0){
      this.myControl.setErrors({'invalid': true});
    }

    if(billForm.form.valid && this.bill.items.length > 0){
      this.billService.create(this.bill).subscribe(bill => {
        swal.fire(this.title, `Bill ${bill.description} create successfully!`, 'success');
        this.router.navigate(['/bill', bill.id]);
      })
    }

  }
}
