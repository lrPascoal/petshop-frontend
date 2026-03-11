import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

// 1. IMPORTAÇÕES PARA O MODAL
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ListaAgendamentosModal } from './lista-agendamentos-modal/lista-agendamentos-modal';

// 2. IMPORTAÇÕES DO RXJS
import { Observable, map, take } from 'rxjs';

import { AgendamentoService } from '../../../services/agendamento';
import { Agendamento } from '../../../models/model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  // Adicionamos o MatDialogModule aqui nos imports
  imports: [
    CommonModule, 
    MatCardModule, 
    MatIconModule, 
    MatTableModule, 
    MatDialogModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  
  // Observables para os dados assíncronos
  agendaHoje$!: Observable<Agendamento[]>;
  totalAgendamentos$!: Observable<number>;

  resumo = {
    petsCadastrados: 42,
    faturamentoDia: 350.00
  };

  colunasAgenda: string[] = ['horario', 'petNome', 'servicoNome', 'status'];
  
  constructor(
    private agendamentoService: AgendamentoService,
    private dialog: MatDialog // 3. INJETAMOS O SERVIÇO DE DIALOG
  ) {}

  ngOnInit(): void {
    // Inicializamos o fluxo de dados
    this.agendaHoje$ = this.agendamentoService.getAgendamentos();

    // Criamos a contagem para o card
    this.totalAgendamentos$ = this.agendaHoje$.pipe(
      map(lista => lista.length)
    );
  }

  /**
   * 4. FUNÇÃO PARA ABRIR O MODAL
   * Usamos o .pipe(take(1)) para pegar a lista atual de agendamentos 
   * e passá-la para dentro do modal.
   */
  abrirDetalhes(): void {
    this.agendaHoje$.pipe(take(1)).subscribe(agendamentos => {
      this.dialog.open(ListaAgendamentosModal, {
        width: '450px',
        data: agendamentos // Enviamos a lista para o componente do Modal
      });
    });
  }
}