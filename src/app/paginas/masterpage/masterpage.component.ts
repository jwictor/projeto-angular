import { Component, inject, OnDestroy, ViewChild } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { 
  PoMenuModule, 
  PoMenuPanelItem, 
  PoMenuPanelModule, 
  PoPageAction, 
  PoPageModule, 
  PoPageSlideComponent, 
  PoPageSlideModule, 
  PoInfoModule, 
  PoButtonModule, 
  PoDividerModule,
  PoInfoOrientation, PoNotificationService, PoModalModule, PoFieldModule,
  PoModalComponent} from '@po-ui/ng-components';
import { CartService } from '../../services/cart.service';
import { environment } from '../../../environments/environment.development';
import { Subscription } from 'rxjs';
import { Cart, ItemCart } from '../../classes/cart';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-masterpage',
  standalone: true,
  imports: [
    PoMenuModule,
    PoMenuPanelModule,
    PoPageModule,
    RouterModule, 
    PoPageSlideModule, 
    PoInfoModule, 
    PoButtonModule,
    PoDividerModule,
    PoModalModule,
    PoFieldModule,
    FormsModule],
  templateUrl: './masterpage.component.html',
  styleUrl: './masterpage.component.css'
})
export class MasterpageComponent implements OnDestroy {

    title: string = 'Home'
    #cartService = inject(CartService)
    #notify = inject(PoNotificationService)
    valueCart$ = this.#cartService.getcartValue();
    valueCart: number = 0;
    cart$ = this.#cartService.getCart();
    cart: Cart = new Cart()
    sub = new Subscription()
    orientation: PoInfoOrientation = PoInfoOrientation.Horizontal;

    urlfiltercustomer: string = `${environment.url}/curso/api/tabelas/sa1`;

    @ViewChild('modalCustomer') modalCustomerEl !: PoModalComponent;


    constructor(){
      const subValue = this.valueCart$.subscribe(vlr => this.valueCart = vlr)
      const subCart = this.cart$.subscribe(cart => this.cart = cart)
      this.sub.add(subValue)
      this.sub.add(subCart)
    }

    ngOnDestroy(): void {
      this.sub.unsubscribe()
    }
    

    readonly menus: PoMenuPanelItem[] = [
      {label: 'Home', link: 'home', action: this.clickItemMenu.bind(this), icon: 'po-icon po-icon-home'},
      {label: 'Clientes', link: 'customers', action: this.clickItemMenu.bind(this), icon: 'po-icon po-icon-user'},
      {label: 'Catalogo', link: 'catalog', action: this.clickItemMenu.bind(this), icon: 'po-icon po-icon-grid'},
      {label: 'Produtos', link: 'budgets', action: this.clickItemMenu.bind(this), icon: 'po-icon po-icon-pushcart'},
      {label: 'Exit', link: 'logoff', action: this.clickItemMenu.bind(this), icon: 'po-icon po-icon-exit'}
    ]

    readonly actions: Array<PoPageAction> = [
      {label: 'Cart', action: this.clickOpenCart.bind(this), icon: 'po-icon po-icon-cart'},
      {label: 'Select Customer', action: () => this.modalCustomerEl.open(), icon: 'po-icon po-icon-user' },
    ]

    @ViewChild('slideCart') slideCart !: PoPageSlideComponent;

    clickItemMenu(menu: PoMenuPanelItem):void {
        this.title = menu.label
    }

    clickOpenCart(): void {
      this.slideCart.open()
    }

    clickDellItem(item: ItemCart){
      item.ativo = false;
      if(this.#cartService.updateCart()) {
        this.#notify.setDefaultDuration(1000)
        this.#notify.success('Item deletado!')
      } else {
        this.#notify.setDefaultDuration(1000)
        this.#notify.error('ERRO!');
      }
    }

    confirmeModal():void {
      this.modalCustomerEl.close();
    }

    clickConfirmCart():void {

    }
}
