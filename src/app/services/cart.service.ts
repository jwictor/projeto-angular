import { Injectable } from "@angular/core";
import { Cart } from "../classes/cart";
import { Product } from "../classes/products";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'root'})

export class CartService {

    private cart: Cart = new Cart
    private value$ = new BehaviorSubject<number>(0)

    getcartValue() {
        return this.value$.asObservable();
    }

    getCart(){
        return this.cart;
    }

    addItem(item: Product){

    }

    updateCart(){

    }
}