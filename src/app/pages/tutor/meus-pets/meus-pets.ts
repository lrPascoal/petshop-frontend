import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { Pet } from '../../../models/model';
import { PetService } from '../../../services/pet'; 

@Component({
  selector: 'app-meus-pets',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './meus-pets.html',
  styleUrl: './meus-pets.css'
})
export class MeusPets implements OnInit {
  colunasExibidas: string[] = ['nome', 'especie', 'raca', 'acoes'];
  listaDePets: Pet[] = [];

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.carregarPets();
  }

  // Criamos uma função separada para carregar a lista, assim podemos reutilizá-la
  carregarPets(): void {
    // O uso dos colchetes com três pontos [...array] cria uma nova referência de memória.
    // Isso "acorda" a tabela do Angular Material e força ela a se redesenhar na tela.
    this.listaDePets = [...this.petService.getPets()];
  }

  // A função que será chamada quando o usuário clicar na lixeira
  excluirPet(id: number, nome: string): void {
    // O confirm() cria aquela caixinha de alerta nativa do navegador (Ok / Cancelar)
    const confirmacao = confirm(`Tem certeza que deseja remover o pet ${nome}?`);
    
    if (confirmacao) {
      // 1. Manda o Serviço apagar o dado
      this.petService.removerPet(id);
      
      // 2. Recarrega a tabela para o pet sumir da tela instantaneamente
      this.carregarPets();
    }
  }
}