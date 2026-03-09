import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// Adicionamos o Router para mudar de tela
import { RouterModule, Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; 

// Importando nosso novo Serviço e o Modelo
import { AgendamentoService } from '../../../services/agendamento';
import { Agendamento } from '../../../models/model';

@Component({
  selector: 'app-agendar',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule, MatFormFieldModule, 
    MatInputModule, MatSelectModule, MatButtonModule, MatCardModule, 
    MatDatepickerModule, MatNativeDateModule
  ],
  templateUrl: './agendar.html',
  styleUrl: './agendar.css'
})
export class Agendar {
  agendarForm: FormGroup;

  meusPets = [
    { id: 1, nome: 'Rex' },
    { id: 2, nome: 'Mimi' },
    { id: 3, nome: 'Thor' }
  ];

  servicosDisponiveis = [
    { id: 1, nome: 'Banho', preco: 50 },
    { id: 2, nome: 'Tosa', preco: 70 },
    { id: 3, nome: 'Banho e Tosa', preco: 100 },
    { id: 4, nome: 'Corte de Unhas', preco: 20 }
  ];

  // Injetamos o Service e o Router aqui
  constructor(
    private fb: FormBuilder,
    private agendamentoService: AgendamentoService,
    private router: Router
  ) {
    this.agendarForm = this.fb.group({
      petId: ['', Validators.required],
      servicoId: ['', Validators.required],
      data: ['', Validators.required],
      hora: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.agendarForm.valid) {
      const form = this.agendarForm.value;

      // 1. Descobrimos o NOME do pet e do serviço escolhido usando o ID
      const petEscolhido = this.meusPets.find(p => p.id === form.petId);
      const servicoEscolhido = this.servicosDisponiveis.find(s => s.id === form.servicoId);

      // 2. Montamos o objeto no formato exato que o Admin espera na tabela
      const novoAgendamento: Agendamento = {
        id: 0,
        petNome: petEscolhido ? petEscolhido.nome : 'Desconhecido',
        servicoNome: servicoEscolhido ? servicoEscolhido.nome : 'Desconhecido',
        data: form.data, // O Angular Material envia um objeto Date
        hora: form.hora,
        status: 'Aguardando'
      };

      // 3. Mandamos o "Gerente" salvar
      this.agendamentoService.adicionarAgendamento(novoAgendamento);

      // 4. Redirecionamos para a tela do Admin para vermos o resultado instantaneamente!
      this.router.navigate(['/admin/dashboard']);

    } else {
      this.agendarForm.markAllAsTouched();
    }
  }
}