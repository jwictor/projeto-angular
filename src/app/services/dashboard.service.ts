import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { BehaviorSubject } from "rxjs";
import { Chart } from "../classes/chart";

@Injectable({providedIn: 'root'})

export class DashboardService {

    private htpp = inject(HttpClient);
    private url: string = environment.url;
    private orcamentos$ = new BehaviorSubject<any>({});
    private orcamentos: any;
    private pedidos$ = new BehaviorSubject<any>({});
    private pedidos: any;

    public getOrcamentos(){return this.orcamentos$.asObservable()}
    public getPedidos(){return this.pedidos$.asObservable()}
    public loaddata(): void {
        let urlOrcamentos: string = `${this.url}/curso/api/dashboard/orcamentos`;
        let urlPedidos: string = `${this.url}/curso/api/dashboard/pedidos`;

        this.htpp.get<Chart>(urlOrcamentos).subscribe({
            next: value => {
                this.orcamentos = value;
                this.orcamentos$.next(this.orcamentos);
            }
        })

        this.htpp.get<Chart>(urlPedidos).subscribe({
            next: value => {
                this.pedidos = value;
                this.pedidos$.next(this.pedidos);
            }
        })
    }
}