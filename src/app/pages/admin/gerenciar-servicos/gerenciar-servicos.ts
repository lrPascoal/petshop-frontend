import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { ServicosPetService, Servico } from '../../../services/servicos-pet';

@Component({
  selector: 'app-gerenciar-servicos',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatTableModule, 
    MatButtonModule, MatInputModule, MatIconModule, MatCardModule
  ],
  templateUrl: './gerenciar-servicos.html',
  styleUrl: './gerenciar-servicos.css'
})
export class GerenciarServicos implements OnInit {
  servicoForm: FormGroup;
  colunas: string[] = ['nome', 'preco', 'acoes'];
  listaDeServicos: Servico[] = [];

  constructor(private fb: FormBuilder, private servicoService: ServicosPetService) {
    this.servicoForm = this.fb.group({
      nome: ['', Validators.required],
      preco: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.atualizarTabela();
  }

  atualizarTabela() {
    this.listaDeServicos = [...this.servicoService.getServicos()];
  }

  salvar() {
    if (this.servicoForm.valid) {
      this.servicoService.adicionar(this.servicoForm.value);
      this.servicoForm.reset();
      this.atualizarTabela();
    }
  }

  excluir(id: number) {
    if (confirm('Deseja remover este serviço?')) {
      this.servicoService.remover(id);
      this.atualizarTabela();
    }
  }
}