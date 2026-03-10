import { Injectable } from '@angular/core';
import { Pet } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private readonly STORAGE_KEY = 'petshop_meus_pets';
  private listaDePets: Pet[] = [];

  constructor() {
    // Ao iniciar, busca os pets salvos no "disco" do navegador
    this.carregarDoStorage();
  }

  private carregarDoStorage(): void {
    const dadosSalvos = localStorage.getItem(this.STORAGE_KEY);
    
    if (dadosSalvos) {
      this.listaDePets = JSON.parse(dadosSalvos);
    } else {
      // Se for a primeira vez abrindo o sistema, cria estes 3 de exemplo
      this.listaDePets = [
        { id: 1, nome: 'Rex', especie: 'Cachorro', raca: 'Labrador', peso: 25, tutorId: 1 },
        { id: 2, nome: 'Mimi', especie: 'Gato', raca: 'Siamês', peso: 4, tutorId: 1 },
        { id: 3, nome: 'Thor', especie: 'Cachorro', raca: 'Pug', peso: 8, tutorId: 1 }
      ];
      this.salvarNoStorage();
    }
  }

  private salvarNoStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.listaDePets));
  }

  getPets(): Pet[] {
    return this.listaDePets;
  }

  getPetById(id: number): Pet | undefined {
    return this.listaDePets.find(pet => pet.id === id);
  }

  adicionarPet(novoPet: Pet): void {
    const ultimoPet = this.listaDePets[this.listaDePets.length - 1];
    const novoId = ultimoPet && ultimoPet.id ? ultimoPet.id + 1 : 1;
    
    novoPet.id = novoId;
    novoPet.tutorId = 1;

    this.listaDePets.push(novoPet);
    this.salvarNoStorage(); // Salva a inclusão
  }

  atualizarPet(petAtualizado: Pet): void {
    const index = this.listaDePets.findIndex(pet => pet.id === petAtualizado.id);
    if (index !== -1) {
      this.listaDePets[index] = petAtualizado;
      this.salvarNoStorage(); // Salva a edição
    }
  }

  removerPet(id: number): void {
    this.listaDePets = this.listaDePets.filter(pet => pet.id !== id);
    this.salvarNoStorage(); // Salva a exclusão
  }
}