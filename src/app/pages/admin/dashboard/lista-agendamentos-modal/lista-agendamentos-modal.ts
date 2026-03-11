import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Agendamento } from '../../../../models/model';

@Component({
  selector: 'app-lista-agendamentos-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatTableModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Agendamentos de Hoje 🐾</h2>
    <mat-dialog-content>
      <table mat-table [dataSource]="data" class="mat-elevation-z2">
        
        <ng-container matColumnDef="pet">
          <th mat-header-cell *matHeaderCellDef> Pet </th>
          <td mat-cell *matCellDef="let a"> {{ a.petNome }} </td>
        </ng-container>

        <ng-container matColumnDef="horario">
          <th mat-header-cell *matHeaderCellDef> Horário </th>
          <td mat-cell *matCellDef="let a"> {{ a.dataHora | date:'HH:mm' }} </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="['pet', 'horario']"></tr>
        <tr mat-row *matRowDef="let row; columns: ['pet', 'horario'];"></tr>
      </table>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Fechar</button>
    </mat-dialog-actions>
  `
})
export class ListaAgendamentosModal {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Agendamento[]) {}
}