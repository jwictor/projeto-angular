import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Customer } from '../classes/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  #http = inject(HttpClient)
  #url = environment.url
  #customerList$ = new Subject<Customer[]>;
  #customerSelected$ = new BehaviorSubject<Customer>(new Customer());

  constructor() {}

  public getCustomers(): Observable<Array<Customer>> {
    let url: string = `${this.#url}/curso/api/tabelas/sa1`;
    let headers = new HttpHeaders();
    let token = localStorage.getItem('access_token');
    headers = headers.append('Authorization',`Bearer ${token}`)

    return this.#http.get<Array<Customer>>(url);
  }

  public setListCustomer(listCustomer: Customer[]): void {
    this.#customerList$.next(listCustomer);
  }

  public getListCustomer(){
    return this.#customerList$.asObservable();
  }

  public setCustomerSelected(customer: Customer) {
    this.#customerSelected$.next(customer);
  }

  public getCustomerSelected() {
    return this.#customerSelected$.asObservable();
  }
}
