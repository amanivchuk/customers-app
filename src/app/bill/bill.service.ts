import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Bill} from './model/Bill';
import {Product} from './model/Product';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  urlEnfPoint: string = 'http://localhost:8080/api/bill';

  constructor(private http: HttpClient) { }

  getBill(id: number): Observable<Bill>{
    return this.http.get<Bill>(`${this.urlEnfPoint}/${id}`);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.urlEnfPoint}/${id}`);
  }

  filterProducts(name: string): Observable<Product[]>{
    return this .http.get<Product[]>(`${this.urlEnfPoint}/filter-products/${name}`);
  }

  create(bill: Bill): Observable<Bill>{
    return this.http.post<Bill>(this.urlEnfPoint, bill);
  }
}
