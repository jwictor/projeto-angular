import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PoChartModule, PoPageModule, PoWidgetModule, PoChartType } from '@po-ui/ng-components';
import { DashboardService } from '../../services/dashboard.service';
import { Subscription } from 'rxjs';
import { ValueChangeEvent } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PoPageModule,PoWidgetModule,PoChartModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnDestroy{

  private dasboardService = inject(DashboardService);
  private orcamentos$ = this.dasboardService.getOrcamentos();
  private pedidos$ = this.dasboardService.getPedidos();
  private sub = new Subscription();
  private router = inject(Router);

  public orcamentos: any;
  public pedidos: any;
  public chartBarras = PoChartType.Bar;


  constructor(){
    this.dasboardService.loaddata();
    const subOrcamentos = this.orcamentos$.subscribe({
      next: value => this.orcamentos = value.series,
    })

    const subPedidos = this.pedidos$.subscribe({
      next: value => this.pedidos = value.series,
    })

    this.sub.add(subOrcamentos);
    this.sub.add(subPedidos);

  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public viewDetail() {
    console.log('ver Detalhes');
    this.router.navigate(['budgets']);
  }
}
