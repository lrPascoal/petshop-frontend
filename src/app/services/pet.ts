import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs'; 
import { Pet } from '../models/model';
import { environment } from '../../environments/environment'; // Importação do environment

@Injectable({
  providedIn: 'root'
})
export class PetService {
  // Agora usamos a URL base vinda do ambiente + o endpoint específico
  private readonly API_URL = `${environment.apiUrl}/pets`;

  constructor(private http: HttpClient) { }

  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.API_URL);
  }

  getPetById(id: number): Observable<Pet> {
    return this.http.get<Pet>(`${this.API_URL}/${id}`);
  }

  adicionarPet(novoPet: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.API_URL, novoPet);
  }

  atualizarPet(pet: Pet): Observable<Pet> {
    return this.http.put<Pet>(`${this.API_URL}/${pet.id}`, pet);
  }

  removerPet(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}