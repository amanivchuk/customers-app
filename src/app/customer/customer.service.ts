import {Injectable} from '@angular/core';
import {CUSTOMERS} from './customer.json';
import {Customer} from './Customer';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';

@Injectable()
export class CustomerService {

  httpHeader = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    // private urlEndPoint:string = 'http://localhost:8080/api/customers',
    private http: HttpClient,
    private router: Router
  ) {
  }

  getCustomers(page: number): Observable<any> {
    // return of(CUSTOMERS);
    return this.http.get('http://localhost:8080/api/customers/page/' + page).pipe(
      tap((response: any) => {
        console.log('Tap 1');
        (response.content as Customer[]).forEach(customer => {
          console.log(customer.id);
        });
      }),
      map((response: any) => {
        (response.content as Customer[]).map(customer => {
          customer.firstName = customer.firstName.toUpperCase();
          return customer;
        });
        return response;
      })
    );
  }

  /*getCustomers(): Observable<Customer[]>{
    // return of(CUSTOMERS);
    return this.http.get('http://localhost:8080/api/customers').pipe(
      tap(response => {
        let customers = response as Customer[];
        console.log('Tap 1');
        customers.forEach(customer => {
          console.log(customer.id);
        })
      }),
      map(response => {
        let customers = response as Customer[];
        return customers.map(customer => {
           customer.firstName = customer.firstName.toUpperCase();
           // customer.createdAt = formatDate(customer.createdAt, 'dd-MM-yyyy', 'en-US');

          // let datePipe = new DatePipe('ru');
            // customer.createdAt = datePipe.transform(customer.createdAt, 'fullDate')
          return customer;
        });
      }),
      tap(response => {
        console.log('Tap 2');
        response.forEach(customer => {
          console.log(customer.id);
        })
      })
    );
  }*/

  create(customer: Customer): Observable<Customer> {
    return this.http.post<any>('http://localhost:8080/api/customers', customer, {headers: this.httpHeader}).pipe(
      map((response: any) => response.customer as Customer),
      catchError(e => {

        if (e.status == 400) {
          return throwError(e);
        }

        console.error(e.error.message);
        swal.fire('Error create new customer', e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getCustomer(id): Observable<Customer> {
    return this.http.get<Customer>('http://localhost:8080/api/customers/' + id).pipe(
      catchError(e => {
        this.router.navigate(['/customers']);
        console.log(e.error.message);
        swal.fire('Error edit customer', e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  update(customer: Customer): Observable<any> {
    return this.http.put<any>('http://localhost:8080/api/customers/' + customer.id, customer, {headers: this.httpHeader}).pipe(
      catchError(e => {
        console.error(e.error.message);
        swal.fire('Error update customer', e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Customer> {
    return this.http.delete<Customer>('http://localhost:8080/api/customers/' + id, {headers: this.httpHeader}).pipe(
      catchError(e => {
        console.error(e.error.message);
        swal.fire('Error delete customer', e.error.error, 'error');
        return throwError(e);
      })
    );
  }
}
