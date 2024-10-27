import { Component, inject } from '@angular/core';
import { PoBreadcrumbItem, PoBreadcrumbModule, PoDividerModule, PoInfoModule, PoPageModule, PoTableColumn, PoTableModule } from '@po-ui/ng-components';
import { Orcamento } from '../../classes/orcamento';
import { BudgetService } from '../../services/budget.service';

@Component({
  selector: 'app-budgetpage',
  standalone: true,
  imports: [PoPageModule,PoTableModule,PoInfoModule,PoDividerModule,PoBreadcrumbModule],
  templateUrl: './budgetpage.component.html',
  styleUrl: './budgetpage.component.css'
})
export class BudgetpageComponent {

  public tableColumns: PoTableColumn[] = [
    {property: 'status', type: 'subtitle', subtitles: [
      {value: 'A', label: 'Aberto', color: 'color-11', content: 'A'},
      {value: 'B', label: 'Aprovado', color: 'color-08', content: 'B'},
      {value: 'C', label: 'Cancelado', color: 'color-04', content: 'C'}
    ]},
    {property: 'numero', label: 'Orcamento'},
    {property: 'valor', label: 'Valor', type: 'currency', format: 'BRL'},
    {property: 'nome', label: 'Cliente'},
    {property: 'filial', label: 'Filial', visible: false},
    {property: 'carrinho', label: 'Carrinho', visible: false},
    {property: 'emissao', label: 'Emissao', visible: false}
  ]

  public orcamentos: Orcamento[] = []

  private orcamentoService = inject(BudgetService)

  public BeadCrumbStr: PoBreadcrumbItem[] = [
    {label: 'Home', link: '/home'},
    {label: 'Orçamentos'}
  ]

  constructor(){
    this.loadOrcamentos();
  }

  private loadOrcamentos() {
    this.orcamentoService.getOrcamentos().subscribe({
      next: (value) => this.orcamentos = value.orcamentos,
      error: (err) => console.log('Erro lista orcamentos', err),
      complete: () => {}
    })
  }

}
