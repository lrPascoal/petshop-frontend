import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Servico {
  id: number;
  nome: string;
  preco: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServicosPetService {
  // Rota para a seção de serviços no seu db.json
  private readonly API_URL = 'https://petshop-api-eeup.onrender.com';

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