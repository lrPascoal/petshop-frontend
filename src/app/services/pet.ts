import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Cliente de rede
import { Observable } from 'rxjs'; // Classe para lidar com dados assíncronos
import { Pet } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  // O JSON Server costuma rodar na porta 3000 por padrão no Linux
  private readonly API_URL = 'https://petshop-api-eeup.onrender.com/pets';

  constructor(private http: HttpClient) { }

  // Retorna um "cano" que trará um Array de Pets
  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.API_URL);
  }

  getPetById(id: number): Observable<Pet> {
    return this.http.get<Pet>(`${this.API_URL}/${id}`);
  }

  adicionarPet(novoPet: Pet): Observable<Pet> {
    // No POST, enviamos o objeto pet no corpo da requisição
    return this.http.post<Pet>(this.API_URL, novoPet);
  }

  atualizarPet(pet: Pet): Observable<Pet> {
    return this.http.put<Pet>(`${this.API_URL}/${pet.id}`, pet);
  }

  removerPet(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}