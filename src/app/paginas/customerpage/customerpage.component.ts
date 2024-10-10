import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { PoInfoModule, PoListViewModule, PoLoadingModule, PoModalComponent, PoModalModule, PoPageFilter, PoPageModule } from '@po-ui/ng-components';
import { Customer } from '../../classes/customer';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customerpage',
  standalone: true,
  imports: [PoPageModule,PoListViewModule, PoInfoModule,PoModalModule,PoLoadingModule],
  templateUrl: './customerpage.component.html',
  styleUrl: './customerpage.component.css'
})
export class CustomerpageComponent implements OnInit {

  isLoading: boolean = true
  CustomerList: Customer[] = []
  CustomerListFiltered: Array<Customer> = []
  detailCustomer: Customer = new Customer()
  #customerService = inject(CustomerService)
  filterSettings: PoPageFilter = {placeholder: "Filtrar por nome ou endereço", action: this.customerFilter.bind(this)}

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
    this.CustomerListFiltered = itens

    setTimeout(()=>this.isLoading = false,1000)
    
  }

  showDetail(customer: Customer):void {
    this.detailCustomer = customer;
    this.modalCustomerElement.open();

  }

  customerFilter(content: string){
    this.CustomerListFiltered = this.CustomerList.filter(customer => 
      customer.nome.indexOf(content.toUpperCase()) >= 0 || 
      customer.endereco.indexOf(content.toUpperCase()) >= 0 )
  }
}
