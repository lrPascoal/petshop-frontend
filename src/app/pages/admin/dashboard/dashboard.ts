import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { AgendamentoService } from '../../../services/agendamento';
import { PetService } from '../../../services/pet';
import { AuthService } from '../../../services/auth';
import { Agendamento } from '../../../models/model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, RouterModule, ReactiveFormsModule, MatSnackBarModule,
    MatCardModule, MatIconModule, MatButtonModule, MatInputModule,
    MatFormFieldModule, MatProgressSpinnerModule, MatMenuModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  
  agendaHoje$!: Observable<Agendamento[]>;
  totalAgendamentos$ = new BehaviorSubject<number>(0);
  
  resumo = { petsCadastrados: 0, faturamentoDia: 0 };
  agendaManha: Agendamento[] = [];
  agendaTarde: Agendamento[] = [];
  agendaNoite: Agendamento[] = [];

  dataSelecionada: string = new Date().toISOString().split('T')[0];

  constructor(
    private agendamentoService: AgendamentoService,
    private petService: PetService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.carregarAgenda();
    this.carregarResumoPets();
  }

  carregarAgenda() {
    this.agendaHoje$ = this.agendamentoService.getAgendamentos().pipe(
      map(todos => {
        return todos.filter(a => {
          if (!this.dataSelecionada) return true;
          const dataAtd = a.dataHora.split('T')[0]; 
          return dataAtd === this.dataSelecionada;
        });
      }),
      tap(agendamentosDoDia => {
        // Atualiza o contador de agendamentos pendentes/totais do dia
        this.totalAgendamentos$.next(agendamentosDoDia.length);
        
        // Organiza os pets nas colunas de turnos
        this.separarPorTurnos(agendamentosDoDia);

        /**
         * DINAMISMO NO FATURAMENTO:
         * Filtramos apenas os agendamentos que o Admin já marcou como "Concluido".
         * Multiplicamos por 80 (valor médio) para ter o faturamento real do dia.
         */
        this.resumo.faturamentoDia = agendamentosDoDia
          .filter(a => a.status === 'Concluido')
          .length * 80;
      })
    );
  }

  separarPorTurnos(agendamentos: Agendamento[]) {
    this.agendaManha = agendamentos.filter(a => {
      const hora = parseInt(a.dataHora.substring(11, 13));
      return hora >= 8 && hora < 12;
    });
    this.agendaTarde = agendamentos.filter(a => {
      const hora = parseInt(a.dataHora.substring(11, 13));
      return hora >= 12 && hora < 18;
    });
    this.agendaNoite = agendamentos.filter(a => {
      const hora = parseInt(a.dataHora.substring(11, 13));
      return hora >= 18 && hora < 22;
    });
  }

  carregarResumoPets() {
    this.petService.getPets().subscribe(pets => this.resumo.petsCadastrados = pets.length);
  }

  filtrarPorData(event: any) {
    this.dataSelecionada = event.target.value;
    this.carregarAgenda();
  }

  alterarStatus(id: number | undefined, novoStatus: string) {
    if (!id) return;
    this.agendamentoService.atualizarStatus(id, novoStatus).subscribe({
      next: () => {
        this.snackBar.open(`Status alterado para ${novoStatus}`, 'OK', { duration: 2000 });
        this.carregarAgenda(); // Recarrega a agenda para atualizar o faturamento e os turnos
      }
    });
  }

  logout() {
    this.authService.fazerLogout();
    this.router.navigate(['/login']);
  }
}