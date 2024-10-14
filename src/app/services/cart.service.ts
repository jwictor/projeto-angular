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

        console.log('item', item);
        if(typeof item.quantidade !== 'number'){
            item['quantidade'] = 1
        }

        item.quantidade === 0 ? item.quantidade = 1 : null
        item.preco === 0 ? item.preco = 1 : null
        
        this.cart.itens.push({
            id:this.cart.itens.length + 1,
            ativo: true,
            item: item
        });

        let valor: number = 0;
        this.cart.itens.forEach((li)=> {
            if(li.ativo){
                valor += (li.item.preco * li.item.quantidade)
            }
        })

        this.value$.next(valor);
    }

    updateCart(){

    }
}