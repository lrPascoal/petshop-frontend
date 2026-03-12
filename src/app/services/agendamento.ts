import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agendamento } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  private readonly API_URL = 'https://petshop-api-eeup.onrender.com/agendamentos';

  constructor(private http: HttpClient) { }

  // Busca todos os agendamentos (útil para o Admin ver a agenda)
  getAgendamentos(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(this.API_URL);
  }

  // Cria um novo agendamento no db.json
  agendar(novo: Agendamento): Observable<Agendamento> {
    return this.http.post<Agendamento>(this.API_URL, novo);
  }

  // Atualiza status (ex: de 'Aguardando' para 'Concluído')
atualizarStatus(id: number, novoStatus: string): Observable<any> {
  // O PATCH altera apenas o campo 'status' no db.json
  return this.http.patch(`${this.API_URL}/${id}`, { status: novoStatus });
}
}