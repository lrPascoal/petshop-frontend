import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

// Importando o Service e a Interface
import { AgendamentoService } from '../../../services/agendamento';
import { Agendamento } from '../../../models/model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatTableModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit { // Adicionamos o OnInit
  resumo = {
    agendamentosHoje: 0, // Vamos atualizar isso dinamicamente depois
    petsCadastrados: 42,
    faturamentoDia: 350.00
  };

  // Atenção aqui: Na tabela do HTML as colunas se chamavam 'pet' e 'servico'. 
  // Na nossa nova interface, chamam-se 'petNome' e 'servicoNome'. Precisamos atualizar!
  colunasAgenda: string[] = ['horario', 'petNome', 'servicoNome', 'status'];
  
  // A lista começa vazia
  agendaHoje: Agendamento[] = [];

  // Injetamos o serviço
  constructor(private agendamentoService: AgendamentoService) {}

  // Quando a tela carregar, buscamos a lista no serviço
  ngOnInit(): void {
    this.agendaHoje = this.agendamentoService.getAgendamentos();
    // Atualiza o contador do cartãozinho lá em cima
    this.resumo.agendamentosHoje = this.agendaHoje.length; 
  }
}