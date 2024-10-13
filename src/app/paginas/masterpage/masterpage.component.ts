import { Component, inject, OnDestroy, ViewChild } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { PoMenuModule, PoMenuPanelItem, PoMenuPanelModule, PoPageAction, PoPageModule, PoPageSlideComponent, PoPageSlideModule, PoInfoModule, PoButtonModule, PoDividerModule} from '@po-ui/ng-components';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-masterpage',
  standalone: true,
  imports: [PoMenuModule,PoMenuPanelModule,PoPageModule,RouterModule, PoPageSlideModule, PoInfoModule, PoButtonModule,PoDividerModule],
  templateUrl: './masterpage.component.html',
  styleUrl: './masterpage.component.css'
})
export class MasterpageComponent implements OnDestroy {

    title: string = 'Home'
    #cartService = inject(CartService)
    valueCart$ = this.#cartService.getcartValue();
    valueCart: number = 0;
    sub = new Subscription()

    constructor(){
      const subValue = this.valueCart$.subscribe(vlr => this.valueCart = vlr)
      this.sub.add(subValue)
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
      {label: 'Cart', action: this.clickOpenCart.bind(this), icon: 'po-icon po-icon-cart'}
    ]

    @ViewChild('slideCart') slideCart !: PoPageSlideComponent;

    clickItemMenu(menu: PoMenuPanelItem):void {
        this.title = menu.label
    }

    clickOpenCart(): void {
      this.slideCart.open()
    }

    clickConfirmCart():void {

    }
}
