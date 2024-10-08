import { Component } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { PoMenuModule, PoMenuPanelItem, PoMenuPanelModule, PoPageModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-masterpage',
  standalone: true,
  imports: [PoMenuModule,PoMenuPanelModule,PoPageModule,RouterModule],
  templateUrl: './masterpage.component.html',
  styleUrl: './masterpage.component.css'
})
export class MasterpageComponent {

    title: string = 'Home'

    readonly menus: PoMenuPanelItem[] = [
      {label: 'Home', link: 'home', action: this.clickItemMenu.bind(this), icon: 'po-icon po-icon-home'},
      {label: 'Customers', link: 'customers', action: this.clickItemMenu.bind(this), icon: 'po-icon po-icon-user'},
      {label: 'Products', link: 'catalog', action: this.clickItemMenu.bind(this), icon: 'po-icon po-icon-grid'},
      {label: 'Budget', link: 'budgets', action: this.clickItemMenu.bind(this), icon: 'po-icon po-icon-pushcart'},
      {label: 'Exit', link: 'logoff', action: this.clickItemMenu.bind(this), icon: 'po-icon po-icon-exit'}
    ]

    clickItemMenu(menu: PoMenuPanelItem):void {
        this.title = menu.label
    }
}
