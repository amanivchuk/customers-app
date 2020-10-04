import {Injectable} from '@angular/core';
import {Customer} from './Customer';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Region} from './Region';

@Injectable()
export class CustomerService {

  constructor(
    // private urlEndPoint:string = 'http://localhost:8080/api/customers',
    private http: HttpClient,
    private router: Router
  ) {}

  getRegions(): Observable<Region[]>{
    return this.http.get<Region[]>('http://localhost:8080/api/customers/regions');
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

  create(customer: Customer): Observable<Customer> {
    return this.http.post<any>('http://localhost:8080/api/customers', customer).pipe(
      map((response: any) => response.customer as Customer),
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }

        if(e.error.message){
          console.error(e.error.message);
        }
        return throwError(e);
      })
    );
  }

  getCustomer(id): Observable<Customer> {
    return this.http.get<Customer>('http://localhost:8080/api/customers/' + id).pipe(
      catchError(e => {
        if(e.status != 401 && e.error.message){
          this.router.navigate(['/customers']);
          console.log(e.error.message);
        }
        return throwError(e);
      })
    );
  }

  update(customer: Customer): Observable<any> {
    return this.http.put<any>('http://localhost:8080/api/customers/' + customer.id, customer).pipe(
      catchError(e => {

        if(e.status == 400){
          return throwError(e);
        }

        if(e.error.message){
          console.error(e.error.message);
        }
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Customer> {
    return this.http.delete<Customer>('http://localhost:8080/api/customers/' + id).pipe(
      catchError(e => {

        if(e.error.message){
          console.error(e.error.message);
        }
        return throwError(e);
      })
    );
  }

  uploadPhoto(photo: File, id): Observable<HttpEvent<{}>>{
    let formData = new FormData();
    formData.append("photo", photo);
    formData.append("id", id);

    const req = new HttpRequest('POST', 'http://localhost:8080/api/customers/upload', formData, {
      reportProgress: true
    });

    return this.http.request(req);
  }
}
