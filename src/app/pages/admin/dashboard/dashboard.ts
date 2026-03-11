import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Import do Spinner

import { Observable, map, take } from 'rxjs';

import { AgendamentoService } from '../../../services/agendamento';
import { Agendamento } from '../../../models/model';
import { ListaAgendamentosModal } from './lista-agendamentos-modal/lista-agendamentos-modal';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatIconModule, 
    MatTableModule, 
    MatDialogModule,
    MatProgressSpinnerModule // Registro do componente
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  agendaHoje$!: Observable<Agendamento[]>;
  totalAgendamentos$!: Observable<number>;

  resumo = {
    petsCadastrados: 42,
    faturamentoDia: 350.00
  };

  colunasAgenda: string[] = ['horario', 'petNome', 'servicoNome', 'status'];
  
  constructor(
    private agendamentoService: AgendamentoService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Filtramos para exibir apenas o que não foi concluído
    this.agendaHoje$ = this.agendamentoService.getAgendamentos().pipe(
      map(lista => lista.filter(a => a.status !== 'Concluído'))
    );

    this.totalAgendamentos$ = this.agendaHoje$.pipe(
      map(lista => lista.length)
    );
  }

  abrirDetalhes(): void {
    this.agendaHoje$.pipe(take(1)).subscribe(agendamentos => {
      const dialogRef = this.dialog.open(ListaAgendamentosModal, {
        width: '480px',
        data: [...agendamentos]
      });

      dialogRef.afterClosed().subscribe(() => {
        this.ngOnInit(); // Sincroniza a tabela ao fechar o modal
      });
    });
  }
}