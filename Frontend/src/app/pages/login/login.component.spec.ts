import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { LoginService } from 'src/app/services/LoginService/login.service';
import { Router } from '@angular/router';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let loginService: LoginService;
  let router: Router;

  beforeEach(() => {
    component = new LoginComponent(loginService, router);
  });

  it('Teste 1 do filtro de SQL Injection', () => {
    expect(component.sqlInjectionFilter("'; OR ''='")).toEqual(" OR ");
  });

  it('Teste 2 do filtro de SQL Injection', () => {
    expect(component.sqlInjectionFilter(
      "'; UPDATE FROM seg_qual.pessoas SET senha='123456' WHERE id > 0 AND '' = '"
      )).toEqual(" UPDATE FROM seg_qualpessoas SET senha123456 WHERE id  0 AND   ");
  });

  it('Teste 3 do filtro de SQL Injection', () => {
    expect(component.sqlInjectionFilter(
      "'; DELETE FROM seg_qual.pessoas WHERE id > 0 AND '' = '"
      )).toEqual(" DELETE FROM seg_qualpessoas WHERE id  0 AND   ");
  });

  it('Teste 4 do filtro de SQL Injection', () => {
    expect(component.sqlInjectionFilter("'; DROP TABLE seg_qual.contas #"))
    .toEqual(" DROP TABLE seg_qualcontas ");
  });

  it('Teste 5 do filtro de SQL Injection', () => {
    expect(component.sqlInjectionFilter("'; DROP DATABASE seg_qual #"))
    .toEqual(" DROP DATABASE seg_qual ");
  });
});
