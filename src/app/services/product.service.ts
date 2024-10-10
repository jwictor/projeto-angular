import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../classes/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  #http = inject(HttpClient)
  #url = environment.url

  constructor() { }

  public getProducts(): Observable<Array<Product>> {
    let url: string = `${this.#url}/curso/api/tabelas/sb1`
    return this.#http.get<Array<Product>>(url)
  }

}
