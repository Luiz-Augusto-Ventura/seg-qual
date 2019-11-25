import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  api = 'http://localhost:3000';
  usuarioLogado = '';

  constructor(
    private http: HttpClient
  ) { }

  login(usuario: any): Promise<any> {
    return this.http.post(`${this.api}/login`, usuario).toPromise();
  }

  signin(usuario: any): Promise<any> {
    return this.http.post(`${this.api}/register`, usuario).toPromise();
  }

  setUsuarioLogado(usuario: string) {
    this.usuarioLogado = usuario;
  }

  getUsuarioLogado(): string {
    return this.usuarioLogado;
  }
}
