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

  carregarPets(): void {
    // Chamamos o serviço (o rádio) e nos sintonizamos (subscribe)
    this.petService.getPets().subscribe({
      next: (dados) => {
        this.listaDePets = dados; // Quando o dado chega, ele preenche a tabela
        console.log('Pets carregados da API com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao buscar pets:', err);
        // Dica: Se o seu servidor (JSON Server) não estiver ligado, 
        // o erro vai cair aqui!
      }
    });
  }

  excluirPet(id: number, nome: string): void {
    if (confirm(`Deseja realmente remover o pet ${nome}?`)) {
      // No HttpClient, até o DELETE precisa do .subscribe() para ser disparado
      this.petService.removerPet(id).subscribe(() => {
        this.carregarPets(); // Recarrega a lista após a exclusão no banco
      });
    }
  }
}