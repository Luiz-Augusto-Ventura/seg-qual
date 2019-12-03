import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/LoginService/login.service';
import { ContasService } from 'src/app/services/ContasService/contas.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let loginService: LoginService;
  let contasService: ContasService;
  let modal: NgbModal;
  let router: Router;
  let http: HttpClient;




  beforeEach(async(() => {
    loginService = new LoginService(http);
    loginService.setUsuarioLogado('Luiz');
    contasService = new ContasService(http);
    component = new HomeComponent(loginService, contasService, modal, router);
    component.contas = [
      { id: 1, tipo: 'p', valor: 150, quitada: false },
      { id: 2, tipo: 'r', valor: 230, quitada: false },
      { id: 3, tipo: 'r', valor: 200, quitada: false },
      { id: 4, tipo: 'p', valor: 180, quitada: false },
      { id: 5, tipo: 'r', valor: 170, quitada: false },
    ];
  }));

  it('Teste de cálculo de média', () => {
    expect(component.calculaMediaContas).toEqual({pagar: 115, receber: 200});
  });
});
