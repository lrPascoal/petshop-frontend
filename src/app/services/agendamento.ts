import { Injectable } from '@angular/core';
import { Agendamento } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  // A nossa "tabela do banco de dados" provisória para a Agenda
  private listaDeAgendamentos: Agendamento[] = [
    { id: 1, hora: '09:00', petNome: 'Rex', servicoNome: 'Banho', data: '2023-10-25', status: 'Concluído' },
    { id: 2, hora: '10:30', petNome: 'Mimi', servicoNome: 'Banho e Tosa', data: '2023-10-25', status: 'Em andamento' },
    { id: 3, hora: '14:00', petNome: 'Thor', servicoNome: 'Corte de Unhas', data: '2023-10-25', status: 'Aguardando' }
  ];

  constructor() { }

  // O Admin vai usar isso para ler a agenda
  getAgendamentos(): Agendamento[] {
    return this.listaDeAgendamentos;
  }

  // O Tutor vai usar isso para marcar um novo horário
  adicionarAgendamento(novo: Agendamento): void {
    const ultimo = this.listaDeAgendamentos[this.listaDeAgendamentos.length - 1];
    const novoId = ultimo && ultimo.id ? ultimo.id + 1 : 1;
    
    novo.id = novoId;
    novo.status = 'Aguardando'; // Todo novo agendamento começa assim

    this.listaDeAgendamentos.push(novo);
    console.log('Service: Agendamento salvo!', this.listaDeAgendamentos);
  }
}