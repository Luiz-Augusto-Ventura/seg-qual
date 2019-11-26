import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContasService {

  api = 'http://localhost:3000/contas';
  constructor(
    private http: HttpClient
  ) { }

  setConta(conta: any): Promise<any> {
    return this.http.post(this.api, conta).toPromise();
  }

  getConta(id: number): Promise<any> {
    return this.http.get(`${this.api}/?id=${id}`).toPromise();
  }

  getContas(): Promise<any> {
    return this.http.get(this.api).toPromise();
  }

  updateConta(conta: any): Promise<any> {
    return this.http.put(this.api, conta).toPromise();
  }

  quitarConta(conta: any): Promise<any> {
    return this.http.put(`${this.api}/?quitar=1`, conta).toPromise();
  }

  deleteConta(id: number): Promise<any> {
    return this.http.delete(`${this.api}/?id=${id}`).toPromise();
  }

  filtrarDataLancamento(di: string, df: string): Promise<any> {
    return this.http.get(`${this.api}/?li=${di}&lf=${df}`).toPromise();
  }

  filtrarDataVencimento(di: string, df: string): Promise<any> {
    return this.http.get(`${this.api}/?vi=${di}&vf=${df}`).toPromise();
  }

}
