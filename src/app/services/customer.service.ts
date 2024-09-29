import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Customer } from '../classes/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  #http = inject(HttpClient)
  #url = environment.url

  constructor() {}

  public getCustomers(): Observable<Array<Customer>> {
    let url: string = `${this.#url}/curso/api/tabelas/sa1`

    return this.#http.get<Array<Customer>>(url)
  }
}
