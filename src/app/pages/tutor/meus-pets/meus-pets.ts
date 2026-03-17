import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { Pet } from '../../../models/model';
import { PetService } from '../../../services/pet'; 

@Component({
  selector: 'app-meus-pets',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './meus-pets.html', // <--- Verifique se este arquivo existe na pasta
  styleUrl: './meus-pets.css'
})
export class MeusPets implements OnInit {
  colunas: string[] = ['nome', 'especie', 'raca', 'acoes'];
  listaDePets: Pet[] = [];

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.carregarPets();
  }

  carregarPets(): void {
    this.petService.getPets().subscribe({
      next: (dados) => this.listaDePets = dados,
      error: (err) => console.error('Erro ao buscar pets:', err)
    });
  }

  excluir(id: number): void {
    if (confirm('Deseja realmente remover este pet?')) {
      this.petService.removerPet(id).subscribe(() => this.carregarPets());
    }
  }
}