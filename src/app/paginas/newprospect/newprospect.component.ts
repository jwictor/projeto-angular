import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ForceOptionComponentEnum, PoButtonModule, PoDynamicFormField, PoDynamicModule, PoNotificationService, PoPageModule } from '@po-ui/ng-components';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-newprospect',
  standalone: true,
  imports: [PoDynamicModule,PoButtonModule,PoPageModule],
  templateUrl: './newprospect.component.html',
  styleUrl: './newprospect.component.css'
})
export class NewprospectComponent {

  public fields: PoDynamicFormField[] = [
    {property: 'tipopessoa', label: 'Tipo Pessoa', gridColumns: 6,gridSmColumns: 12, options: [
      {label: 'Fisica', value: 'F'},
      {label: 'Juridica', value: 'J'},
      {label: 'Outros', value: 'X'}
    ],
    fieldLabel: 'label',
    fieldValue: 'value',
    forceOptionsComponentType: ForceOptionComponentEnum.select,
  },
  {property: 'cgc', label: 'CPF/CNPJ', gridColumns: 6, gridLgColumns: 12},
  {property: 'nome', label: 'Nome', required: true, gridColumns: 6, gridSmColumns: 12, placeholder: 'Informe o nome'},
  {property: 'contato', label: 'Contato', gridColumns: 6, gridSmColumns: 12, placeholder: 'Nome do contato'},
  {property: 'endereco', label: 'Endereco', gridColumns: 12, gridSmColumns: 12, placeholder: 'Informe o endereco completo', divider: 'Endereco'},
  {property: 'email', label: 'Email', gridColumns: 12, gridSmColumns: 12, placeholder: 'Email', divider: 'Contato', type: 'email'},
  {property: 'ddd', label:'DDD', gridColumns: 3, gridSmColumns: 3},
  {property: 'telefone', label: 'Telefone', gridColumns: 9, gridSmColumns: 6, mask: '99999-9999'},
  {property: 'homepage', label: 'Home Page', gridColumns: 12, gridSmColumns: 12}
 
  ];

  private http = inject(HttpClient);
  private route = inject(Router);
  private url: string = environment.url;
  private notify = inject(PoNotificationService)

  public confirmForm(form: any){
    this.http.post<any>(`${this.url}/curso/api/prospects`, form)
    .subscribe({
      next: value => this.notify.success({ duration: 2000, message: `Novo prospect: ${value.codigo}` }),
      error: err => this.notify.error(err.error.status),
      complete: () => this.route.navigate(['/prospects'])
    })
  }

}
