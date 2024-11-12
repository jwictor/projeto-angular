import { Component, ViewChild } from '@angular/core';
import { PoPageDynamicTableActions, PoPageDynamicTableCustomAction, PoPageDynamicTableField, PoPageDynamicTableModule } from '@po-ui/ng-templates';
import { environment } from '../../../environments/environment.development';
import { PoDynamicModule, PoDynamicViewField, PoModalComponent, PoModalModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-prospects',
  standalone: true,
  imports: [PoPageDynamicTableModule,PoModalModule,PoDynamicModule],
  templateUrl: './prospects.component.html',
  styleUrl: './prospects.component.css'
})
export class ProspectsComponent {

  public fields: PoPageDynamicTableField[] = [
    {property: 'codigo', label: 'Codigo', filter: true, key: true},
    {property: 'loja', label: 'Loja', key: true, visible: false, allowColumnsManager: true},
    {property: 'nome', label: 'Nome', filter: true},
    {property: 'tipopessoa', label: 'Tipo Pessoa', filter: true, type: 'label', labels: [
      {value: ' ', label: 'Fisica', color: '#000080' ,textColor: '#F0F8FF', icon: 'ph ph-user'},
      {value: 'F', label: 'Fisica', color: '000080' ,textColor: '#F0F8FF', icon: 'ph ph-user'},
      {value: 'J', label: 'Juridica', color: '#4B0082' , textColor: '#F0F8FF', icon: 'ph ph-building'},
      {value: 'X', label: 'Outros', color: '#8B008B' , textColor: '#F0F8FF', icon: ''},
    ]},
   {property: 'cgc', label: 'CPF/CNPJ', filter: true},
   {property: 'email', label: 'Email'},
   {property: 'ddd', label: 'DDD'},
   {property: 'telefone', label: 'Telefone'},
   {property: 'status', label: 'Status', filter: true, type: 'label', labels: [
    {value: ' ', label: 'Ativo', color: '#006400' ,textColor: '#F0F8FF', icon: 'ph ph-check-square'},
    {value: '2', label: 'Ativo', color: '#006400' ,textColor: '#F0F8FF', icon: 'ph ph-check-square'},
    {value: '1', label: 'Inativo', color: '#8B0000' ,textColor: '#F0F8FF', icon: 'ph ph-x-square'},
  ]},
  ];

  public url: string = `${environment.url}/curso/api/prospects`;

  public actions: PoPageDynamicTableActions = { new: '/prospects/new', remove: true };
  
  public tableActions: PoPageDynamicTableCustomAction[] = [
    {label: 'Detalhes', action: this.openDetailProspect.bind(this), icon: 'pu ph-user' }
  ];
  public nomeprospect: string = ''

  @ViewChild('prospectDetailModal') prospectModalEl !: PoModalComponent;

  public prospctFields: PoDynamicViewField[] = [
    {property: 'codigo', label: 'Codigo', gridColumns: 2},
    {property: 'loja', label: 'Loja'},
   // {property: 'nome', label: 'Nome'},
    {property: 'email', label: 'Email', divider: 'Contato', gridColumns: 12},
    {property: 'ddd', label: 'DDD', gridColumns: 3},
    {property: 'telefone', label: 'Telefone', gridColumns: 9},
    {property: 'endereco', label: 'Endereco', divider: 'Endereço', gridColumns: 12}
  ];

  public prospectData: any;

  public openDetailProspect(prospect: any) {
    this.nomeprospect = prospect.nome;
    this.prospectData = prospect;
    this.prospectModalEl.open();
  }
}
