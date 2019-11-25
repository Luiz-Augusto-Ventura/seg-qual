import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAcaoComponent } from './modal-acao.component';

describe('ModalAcaoComponent', () => {
  let component: ModalAcaoComponent;
  let fixture: ComponentFixture<ModalAcaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAcaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAcaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
