import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalContaComponent } from './modal-conta.component';

describe('ModalContaComponent', () => {
  let component: ModalContaComponent;
  let fixture: ComponentFixture<ModalContaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalContaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
