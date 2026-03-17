import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Importação do environment

export interface Servico {
  id: number;
  nome: string;
  preco: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServicosPetService {
  private readonly API_URL = `${environment.apiUrl}/servicos`;

  constructor(private http: HttpClient) { }

  getServicos(): Observable<Servico[]> {
    return this.http.get<Servico[]>(this.API_URL);
  }

  adicionar(novo: Servico): Observable<Servico> {
    return this.http.post<Servico>(this.API_URL, novo);
  }

  remover(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}