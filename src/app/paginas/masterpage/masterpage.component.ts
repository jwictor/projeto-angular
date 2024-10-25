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
  PoModalComponent,
  PoComboComponent,
  PoNotification,
  PoDialogService,
  PoLoadingModule} from '@po-ui/ng-components';
import { CartService } from '../../services/cart.service';
import { CustomerService } from '../../services/customer.service';
import { environment } from '../../../environments/environment.development';
import { Subscription } from 'rxjs';
import { Cart, ItemCart } from '../../classes/cart';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../classes/customer';

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
    PoLoadingModule,
    FormsModule],
  templateUrl: './masterpage.component.html',
  styleUrl: './masterpage.component.css'
})
export class MasterpageComponent implements OnDestroy {

    title: string = 'Home'
    #cartService = inject(CartService)
    #notify = inject(PoNotificationService)
    #customerService = inject(CustomerService)
    #dialog = inject(PoDialogService);
    valueCart$ = this.#cartService.getcartValue();
    valueCart: number = 0;
    cart$ = this.#cartService.getCart();
    cart: Cart = new Cart()
    listCustomer$  = this.#customerService.getCustomers();
    listCustomer: any;
    customerSelected$ = this.#customerService.getCustomerSelected();
    customerSelected: Customer = new Customer();
    sub = new Subscription()
    orientation: PoInfoOrientation = PoInfoOrientation.Horizontal;
    hiddenOverlayCart$ = this.#cartService.getHiddenLoading();
    hiddenOverlayCart: boolean = true;

    urlfiltercustomer: string = `${environment.url}/curso/api/tabelas/sa1`;

    @ViewChild('slideCart') slideCart !: PoPageSlideComponent;
    @ViewChild('modalCustomer') modalCustomerEl !: PoModalComponent;
    @ViewChild('comboCustomer') comboCustomerEl !: PoComboComponent;


    constructor(){
      const subValue = this.valueCart$.subscribe(vlr => this.valueCart = vlr)
      const subCart = this.cart$.subscribe(cart => this.cart = cart)
      const subList = this.listCustomer$.subscribe(list => this.listCustomer = list);
      const subCustomer = this.customerSelected$.subscribe(customer => this.customerSelected = customer)
      const subHidden = this.hiddenOverlayCart$.subscribe(hidden => this.hiddenOverlayCart = hidden);
      this.sub.add(subValue)
      this.sub.add(subCart)
      this.sub.add(subList);
      this.sub.add(subCustomer);
      this.sub.add(subHidden);
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

  

    clickItemMenu(menu: PoMenuPanelItem):void {
        this.title = menu.label
    }

    clickOpenCart(): void {
      this.slideCart.open()
    }

    clickDellItem(item: ItemCart){
      item.ativo = false;
      if(this.#cartService.updateCart()) {
        let isSendCart: boolean = this.#cartService.sendCartERP();
        this.#notify.setDefaultDuration(1000)
        this.#notify.success('Item deletado!')
      } else {
        this.#notify.setDefaultDuration(1000)
        this.#notify.error('ERRO!');
      }
    }

    confirmModal():void {

      let codigo: string = this.comboCustomerEl.selectedValue;
      let nome: string = '';
      let list: Array<Customer> = this.listCustomer.items;
      let customerSelected: Customer = new Customer;
      let notify: PoNotification = {
        message: 'nenhum cliente selecionado!',
        duration: 3000,
      }

      if(codigo){
        nome = this.comboCustomerEl.selectedOption.label
      list.forEach((customer: Customer) => {
        if(customer.codigo === codigo && customer.nome === nome){
          customerSelected = customer;
          notify.message = `Novo cliente Selecionaodo: ${customer.nome}`
        }
      })
    }
      this.#customerService.setCustomerSelected(customerSelected);
      this.#notify.information(notify);
      this.#cartService.getCartERP();
      this.modalCustomerEl.close();
    }

    clickConfirmCart():void {

      let isConfirm: boolean = false;

      this.#dialog.confirm({
        title: 'Confirmação de Encerramento',
        message: 'Confirma o encerramento do carrinho?',
        confirm: () =>{ isConfirm = this.#cartService.confirmCartERP()},
        cancel: () => {console.log('Clicou em cancelar')}
      })
    }
}
