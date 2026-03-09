import { Injectable } from '@angular/core';
import { Pet } from '../models/model'; // Puxando a interface que dita como é um Pet

// O 'providedIn: root' significa que esse serviço é único (Singleton) e 
// pode ser acessado por qualquer tela do sistema sem precisarmos recriá-lo.
@Injectable({
  providedIn: 'root'
})
export class PetService {

  // A nossa "tabela do banco de dados" provisória (Mock)
  // Deixamos 'private' para que as telas não mexam nela diretamente, apenas usando as funções.
  private listaDePets: Pet[] = [
    { id: 1, nome: 'Rex', especie: 'Cachorro', raca: 'Labrador', peso: 25, tutorId: 1 },
    { id: 2, nome: 'Mimi', especie: 'Gato', raca: 'Siamês', peso: 4, tutorId: 1 },
    { id: 3, nome: 'Thor', especie: 'Cachorro', raca: 'Pug', peso: 8, tutorId: 1 }
  ];

  constructor() { }

  // Função 1: A Tabela vai usar isso para pegar os pets e mostrar na tela
  getPets(): Pet[] {
    return this.listaDePets;
  }

  // Função 2: O Formulário vai usar isso para enviar um pet novo
  adicionarPet(novoPet: Pet): void {
    // Pegamos o último pet da lista com segurança
    const ultimoPet = this.listaDePets[this.listaDePets.length - 1];
    
    // Se o último pet existir e tiver um ID, somamos 1. Se não, o ID é 1.
    const novoId = ultimoPet && ultimoPet.id ? ultimoPet.id + 1 : 1;
    
    // Adiciona o ID ao pet que veio do formulário
    novoPet.id = novoId;
    novoPet.tutorId = 1;

    // Coloca o novo pet dentro da nossa lista
    this.listaDePets.push(novoPet);
    
    console.log('Service: Pet adicionado com sucesso!', this.listaDePets);
  }
}