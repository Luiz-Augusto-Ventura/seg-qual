import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/LoginService/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login(usuario: any) {
    const login = {
      nome: this.sqlInjectionFilter(usuario.nome),
      senha: this.sqlInjectionFilter(usuario.senha)
    };
    this.loginService.login(login)
    .then(u => {
      if(u.nome) {
        this.loginService.setUsuarioLogado(u.nome);
        this.router.navigate(['/home']);
      }
      else {
        alert('Credenciais incorretas');
      }
    })
    .catch(err => {
      alert('Credenciais incorretas');
      console.log(err);
    })
  }

  registrar(usuario: any) {
    const login = {
      nome: this.sqlInjectionFilter(usuario.nome),
      senha: this.sqlInjectionFilter(usuario.senha)
    };
    this.loginService.signin(login)
    .then(u => {
      if(u) {
        alert('Usuário cadastrado com sucesso');
      }
    })
    .catch(err => {
      alert('Erro ao cadastrar usuário');
      console.log(err);
    });
  }

  sqlInjectionFilter(login: string): string {
    return login.replace("'", '').replace(';', '').replace('#', '');
  }
}
