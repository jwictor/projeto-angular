import { inject, Injectable, OnDestroy } from "@angular/core";
import { Cart } from "../classes/cart";
import { Product } from "../classes/products";
import { BehaviorSubject, Subject, Subscription } from "rxjs";
import { CustomerService } from "./customer.service";
import { Customer } from "../classes/customer";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment.development";

@Injectable({providedIn: 'root'})

export class CartService implements OnDestroy{

    private cart: Cart = new Cart
    private value$ = new BehaviorSubject<number>(0)
    private cart$ = new Subject<Cart>;
    private customerService = inject(CustomerService);
    private customerSelected$ = this.customerService.getCustomerSelected();
    private customerSelected: Customer = new Customer();
    private sub = new Subscription();
    private http = inject(HttpClient);
    private url = environment.url;

    constructor(){
        const subCustomer = this.customerSelected$.subscribe(customer => this.customerSelected = customer);
        this.sub.add(subCustomer);
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    sendCartERP(): boolean {
        this.cart.codCliente = this.customerSelected.codigo;
        this.cart.lojCliente = this.customerSelected.loja;
        this.cart.nomeCliente = this.customerSelected.nome;

        let isSincCart: boolean = true;

        this.http.post(`${this.url}/curso/api/cart`,this.cart).subscribe({
            next: (value) => isSincCart = true,
            error: (err) => console.log(`error`,err),
            complete:() => {}
        })
        
        return isSincCart;
    }

    getCartERP(): void {
        let codCliente: string = this.customerSelected.codigo;
        let lojCliente: string = this.customerSelected.loja;
        this.http.get<Cart>(`${this.url}/curso/api/cart/itens/${codCliente}/${lojCliente}`)
        .subscribe({
            next: (value) => {
                this.cart = new Cart();
                this.cart.codCliente = value.codCliente;
                this.cart.lojCliente = value.lojCliente;
                this.cart.nomeCliente = value.nomeCliente;
                this.cart.valor = value.valor;
                this.cart.itens = value.itens;

                this.cart$.next(this.cart);
                this.value$.next(this.cart.valor);
            },
            error: (err) => console.log('error', err),
            complete: () => {}
        })
    }

    getcartValue() {
        return this.value$.asObservable();
    }

    getCart(){
        return this.cart$.asObservable();
    }

    addItem(item: Product) : boolean{
        
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
        this.cart$.next(this.cart)

        return true;
    }

    updateCart() : boolean {
        let valor:number = 0;
        this.cart.itens.forEach((li) => valor += li.ativo ? (li.item.preco * li.item.quantidade) : 0 )
        this.value$.next(valor);

        return true;
    }
}