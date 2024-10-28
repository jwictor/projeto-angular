import { Component } from '@angular/core';
import { PoPageDynamicTableField, PoPageDynamicTableModule } from '@po-ui/ng-templates';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-prospects',
  standalone: true,
  imports: [PoPageDynamicTableModule],
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
  ]

  public url: string = `${environment.url}/curso/api/prospects`

}
