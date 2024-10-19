import { Component, inject, OnInit} from '@angular/core';
import { PoFieldModule, PoInfoModule, PoListViewModule, PoLoadingModule, PoModalModule, PoNotificationService, PoPageAction, PoPageFilter, PoPageModule } from '@po-ui/ng-components';
import { Product } from '../../classes/products';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-catalogpage',
  standalone: true,
  imports: [PoPageModule,PoListViewModule,PoInfoModule,PoModalModule,PoLoadingModule,PoFieldModule,FormsModule],
  templateUrl: './catalogpage.component.html',
  styleUrl: './catalogpage.component.css'
})
export class CatalogpageComponent implements OnInit{
  isLoading: boolean = true
  productList: Array<Product> = []
  productListFiltered: Array<Product> = []
  detailproduct: Product = new Product()
  #productService = inject(ProductService)
  #cartService = inject(CartService)
  #notify = inject(PoNotificationService)
  filterSettings: PoPageFilter = {placeholder: "Filtrar por nome ou categoria", action: this.productFilter.bind(this)}

  ngOnInit(): void {
    this.loadData()
  }

  loadData():void {
      
    let req = this.#productService.getProducts()
    let itens: Array<Product> = []

    req.subscribe((res: any) => {
      console.log(res)
        res.items.forEach((el: Product) => itens.push(el));
        this.isLoading = false
      }
    )

    this.productList = itens
    this.productListFiltered = itens
  }

  addCart(item: Product) {
   if(this.#cartService.addItem(item)) {
    this.#notify.setDefaultDuration(1000);
    this.#notify.success('Item incluido!')
   } else {
    this.#notify.setDefaultDuration(10000);
    this.#notify.error('ERRO');
   }
  }

  showDetail(product: Product):void {

  }

  productFilter(content: string) {
    this.productListFiltered = this.productList.filter(product => 
      product.nome.indexOf(content.toUpperCase()) >= 0 || 
      product.categoria.indexOf(content.toUpperCase()) >= 0)
  }

  readonly productAction: Array<PoPageAction> = [
    {label: 'Cart', action: this.addCart.bind(this), icon: 'po-icon po-icon-cart'}
  ]

  clickAddCart(): void {

  }

} 
