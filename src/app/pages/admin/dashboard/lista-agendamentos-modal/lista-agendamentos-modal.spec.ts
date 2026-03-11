import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAgendamentosModal } from './lista-agendamentos-modal';

describe('ListaAgendamentosModal', () => {
  let component: ListaAgendamentosModal;
  let fixture: ComponentFixture<ListaAgendamentosModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaAgendamentosModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAgendamentosModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
