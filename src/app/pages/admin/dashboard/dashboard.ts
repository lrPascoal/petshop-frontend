import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Imports do Angular Material para Cards, Ícones e Tabelas
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatTableModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  // Dados simulados para os Cartões de Resumo no topo da tela
  resumo = {
    agendamentosHoje: 5,
    petsCadastrados: 42,
    faturamentoDia: 350.00
  };

  // Configuração das colunas da tabela de agenda do dia
  colunasAgenda: string[] = ['horario', 'pet', 'servico', 'status'];
  
  // Mock da lista de atendimentos programados para hoje
  agendaHoje = [
    { horario: '09:00', pet: 'Rex', servico: 'Banho', status: 'Concluído' },
    { horario: '10:30', pet: 'Mimi', servico: 'Banho e Tosa', status: 'Em andamento' },
    { horario: '14:00', pet: 'Thor', servico: 'Corte de Unhas', status: 'Aguardando' }
  ];
}