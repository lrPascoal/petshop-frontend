import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agendamento } from '../models/model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  private readonly API_URL = `${environment.apiUrl}/agendamentos`;

  constructor(private http: HttpClient) { }

  /**
   * Busca todos os agendamentos (Usado pelo Dashboard do Admin)
   */
  getAgendamentos(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(this.API_URL);
  }

  /**
   * Cria um novo agendamento (Usado pela tela de Agendar do Tutor)
   * Ajustado para 'criarAgendamento' para bater com o seu Componente
   */
  criarAgendamento(novo: Agendamento): Observable<Agendamento> {
    return this.http.post<Agendamento>(this.API_URL, novo);
  }

  /**
   * Atualiza apenas o status (Usado pelo Admin para confirmar/concluir)
   */
  atualizarStatus(id: number, novoStatus: string): Observable<Agendamento> {
    // O PATCH é ideal aqui pois altera apenas um pedaço do objeto
    return this.http.patch<Agendamento>(`${this.API_URL}/${id}`, { status: novoStatus });
  }

  /**
   * Remove um agendamento (Cancelamento)
   */
  cancelarAgendamento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}