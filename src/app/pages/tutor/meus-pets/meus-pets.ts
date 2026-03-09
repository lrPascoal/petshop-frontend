import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

// Importando nosso modelo e nosso novo serviço
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
  
  // A lista agora começa vazia
  listaDePets: Pet[] = [];

  // Injetamos o PetService dentro do construtor
  constructor(private petService: PetService) {}

  // O ngOnInit é o "ciclo de vida" executado logo que a tela carrega
  ngOnInit(): void {
    // Pedimos ao gerente (Service) a lista atualizada
    this.listaDePets = this.petService.getPets();
  }
}