import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AgendamentoService } from '../../../../services/agendamento';
import { Agendamento } from '../../../../models/model';

@Component({
  selector: 'app-lista-agendamentos-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="modal-wrapper">
      <h2 mat-dialog-title class="modal-header">
        <mat-icon>schedule</mat-icon> 
        <span>Próximos Atendimentos</span>
      </h2>
      
      <mat-dialog-content class="modal-body">
        <div *ngFor="let a of data" class="agendamento-card">
          <div class="time-box">
            <span class="hour">{{ a.dataHora | date:'HH:mm' }}</span>
          </div>
          
          <div class="pet-info">
            <strong class="name">{{ a.petNome }}</strong>
            <span class="service">{{ a.servicoNome }}</span>
          </div>

          <div class="status-tag" 
               [ngClass]="formatClass(a.status)" 
               (click)="proximoStatus(a)"
               title="Clique para mudar status">
            {{ a.status }}
          </div>
        </div>

        <div *ngIf="data.length === 0" class="empty-state">
          <mat-icon color="primary">check_circle</mat-icon>
          <p>Tudo pronto! Nenhum atendimento pendente.</p>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions align="end" class="modal-footer">
        <button mat-flat-button color="primary" mat-dialog-close class="btn-fechar">Fechar</button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .modal-wrapper { padding: 8px; }
    .modal-header { display: flex; align-items: center; gap: 12px; color: #3f51b5; font-size: 1.4rem; margin-bottom: 20px !important; }
    .modal-body { min-width: 450px; max-height: 60vh; padding: 10px 5px !important; overflow-x: hidden; }
    
    .agendamento-card {
      display: flex; align-items: center; 
      padding: 16px; margin-bottom: 16px; border-radius: 12px;
      background: #ffffff; border: 1px solid #eee;
      box-shadow: 0 4px 6px rgba(0,0,0,0.02);
      transition: all 0.3s ease;
    }

    .time-box { background: #e8eaf6; color: #3f51b5; padding: 8px 12px; border-radius: 8px; font-weight: bold; min-width: 60px; text-align: center; }
    
    .pet-info { display: flex; flex-direction: column; flex: 1; margin: 0 20px; }
    .name { font-size: 1.1rem; color: #222; }
    .service { font-size: 0.85rem; color: #777; margin-top: 2px; }

    .status-tag { 
      min-width: 120px; text-align: center; padding: 8px 12px; border-radius: 8px; 
      font-size: 0.7rem; font-weight: 800; text-transform: uppercase; 
      cursor: pointer; user-select: none; transition: transform 0.1s;
    }
    .status-tag:active { transform: scale(0.95); }
    
    .status-aguardando { background: #fff3cd; color: #856404; border: 1px solid #ffeeba; }
    .status-andamento { background: #cce5ff; color: #004085; border: 1px solid #b8daff; }
    .status-concluido { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }

    .modal-footer { padding: 16px 0 8px 0; }
    .btn-fechar { border-radius: 20px; padding: 0 25px; height: 40px; }

    .empty-state { text-align: center; padding: 40px 20px; color: #666; }
    .empty-state mat-icon { font-size: 60px; width: 60px; height: 60px; margin-bottom: 15px; }
  `]
})
export class ListaAgendamentosModal {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Agendamento[],
    private agendamentoService: AgendamentoService
  ) {}

  formatClass(status: string) {
    // Normaliza para funcionar com "Concluído" (remove acento e coloca hífen)
    return 'status-' + status.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, '-');
  }

  proximoStatus(agendamento: Agendamento): void {
    let novoStatus: 'Aguardando' | 'Em andamento' | 'Concluído';

    if (agendamento.status === 'Aguardando') {
      novoStatus = 'Em andamento';
    } else if (agendamento.status === 'Em andamento') {
      novoStatus = 'Concluído';
    } else {
      novoStatus = 'Aguardando';
    }

    this.agendamentoService.atualizarStatus(agendamento.id!, novoStatus).subscribe({
      next: () => {
        agendamento.status = novoStatus;

        // Se concluído, remove da lista do modal para dar sensação de "tarefa feita"
        if (novoStatus === 'Concluído') {
          setTimeout(() => {
            this.data = this.data.filter(item => item.id !== agendamento.id);
          }, 400); 
        }
      }
    });
  }
}