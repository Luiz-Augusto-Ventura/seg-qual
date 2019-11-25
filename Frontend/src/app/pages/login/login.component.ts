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
    this.loginService.login(usuario)
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
}
