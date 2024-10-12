import { Component, ViewChild } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { PoMenuModule, PoMenuPanelItem, PoMenuPanelModule, PoPageAction, PoPageModule, PoPageSlideComponent, PoPageSlideModule} from '@po-ui/ng-components';

@Component({
  selector: 'app-masterpage',
  standalone: true,
  imports: [PoMenuModule,PoMenuPanelModule,PoPageModule,RouterModule, PoPageSlideModule],
  templateUrl: './masterpage.component.html',
  styleUrl: './masterpage.component.css'
})
export class MasterpageComponent {

    title: string = 'Home'

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
}
