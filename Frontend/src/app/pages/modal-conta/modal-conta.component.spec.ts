import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import 'zone.js/dist/zone-testing';
import { ModalContaComponent } from './modal-conta.component';
import { ContasService } from 'src/app/services/ContasService/contas.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

fdescribe('Testes sobre o componente ModalConta', () => {
  let conta: ModalContaComponent;
  let contasService: ContasService;
  let modal: NgbActiveModal;


  beforeEach(() => {
    conta = new ModalContaComponent(contasService, modal);
  });

  it('Data ok 1', () => {
    expect(conta.formataData('2019-11-22T00:00:00.000Z')).toEqual('22/11/2019');
  });

  it('Data ok 2', () => {
    expect(conta.formataData('2019-11-25T00:00:00.000Z')).toEqual('25/11/2019');
  });

  it('Data ok 3', () => {
    expect(conta.formataData('2019/11/21T00:00:00.000Z')).toEqual('21-11-2019');
    //expect(conta.formataData('2019-11-21T00:00:00.000Z')).toEqual('21/11/2019');
  });

  it('Data ok 4', () => {
    expect(conta.formataData('2019-11-27T00:00:00.000Z')).toEqual('27/11/2019');
  });

  it('Data ok 5', () => {
    expect(conta.formataData('2019-11-23T00:00:00.000Z')).toEqual('22-11-2019');
    //expect(conta.formataData('2019-11-23T00:00:00.000Z')).toEqual('23/11/2019');
  });
});
