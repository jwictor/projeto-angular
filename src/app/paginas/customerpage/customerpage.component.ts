import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { PoInfoModule, PoListViewModule, PoModalComponent, PoModalModule, PoPageModule } from '@po-ui/ng-components';
import { Customer } from '../../classes/customer';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customerpage',
  standalone: true,
  imports: [PoPageModule,PoListViewModule, PoInfoModule,PoModalModule],
  templateUrl: './customerpage.component.html',
  styleUrl: './customerpage.component.css'
})
export class CustomerpageComponent implements OnInit {

  public CustomerList: Customer[] = []
  detailCustomer: Customer = new Customer()
  #customerService = inject(CustomerService)

  @ViewChild('modalCustomer') modalCustomerElement !: PoModalComponent

  ngOnInit(): void {
    this.loadData()
  }

  loadData():void {
    let req = this.#customerService.getCustomers()
    let itens: Array<Customer> = []

    req.subscribe({
      next(value: any) {
        value.items.forEach((el:Customer) => {
          itens.push(el)
        });
      },
      error(err){
        console.log(`error req customer list`, err)
      },
      complete(){
        console.log(`complete customer list`)
      }
    })

    this.CustomerList = itens
  }

  showDetail(customer: Customer):void {
    this.detailCustomer = customer;
    this.modalCustomerElement.open();

  }
}
