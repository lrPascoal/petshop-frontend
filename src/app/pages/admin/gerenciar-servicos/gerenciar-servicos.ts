import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-gerenciar-servicos',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './gerenciar-servicos.html',
  styleUrl: './gerenciar-servicos.css'
})
export class GerenciarServicos {
  // As colunas que vão aparecer na tabela
  colunasExibidas: string[] = ['nome', 'descricao', 'preco', 'duracao', 'acoes'];

  // Mock do catálogo de serviços do Pet Shop
  listaServicos = [
    { id: 1, nome: 'Banho Simples', descricao: 'Lavagem completa com shampoo neutro.', preco: 50.00, duracao: '40 min' },
    { id: 2, nome: 'Banho e Tosa', descricao: 'Lavagem + Tosa higiênica e corte de unhas.', preco: 100.00, duracao: '1h 30m' },
    { id: 3, nome: 'Hidratação', descricao: 'Banho + Máscara de hidratação profunda.', preco: 80.00, duracao: '1h 00m' },
    { id: 4, nome: 'Corte de Unhas', descricao: 'Apenas o corte seguro das unhas.', preco: 20.00, duracao: '15 min' }
  ];
}