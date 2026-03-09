import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// Importando a interface para garantir que os dados sigam o padrão
import { Pet } from '../../../models/model';

@Component({
  selector: 'app-meus-pets',
  standalone: true,
  // Precisamos declarar aqui tudo o que o HTML vai usar
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './meus-pets.html',
  styleUrl: './meus-pets.css'
})
export class MeusPets {
  // Define quais colunas vão aparecer e em qual ordem
  colunasExibidas: string[] = ['nome', 'especie', 'raca', 'acoes'];

  // Dados mockados: Simulando o que o Java vai nos devolver do banco de dados no futuro
  listaDePets: Pet[] = [
    { id: 1, nome: 'Rex', especie: 'Cachorro', raca: 'Labrador', peso: 25, tutorId: 1 },
    { id: 2, nome: 'Mimi', especie: 'Gato', raca: 'Siamês', peso: 4, tutorId: 1 },
    { id: 3, nome: 'Thor', especie: 'Cachorro', raca: 'Pug', peso: 8, tutorId: 1 }
  ];
}