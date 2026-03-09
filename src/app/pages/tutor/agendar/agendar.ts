import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Componentes do Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
// Novos imports para o Calendário funcionar:
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; 

@Component({
  selector: 'app-agendar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule // Extremamente necessário para o Datepicker
  ],
  templateUrl: './agendar.html',
  styleUrl: './agendar.css'
})
export class Agendar {
  agendarForm: FormGroup;

  // Mock de pets para aparecer na caixa de seleção
  meusPets = [
    { id: 1, nome: 'Rex' },
    { id: 2, nome: 'Mimi' },
    { id: 3, nome: 'Thor' }
  ];

  // Mock de serviços com preços
  servicosDisponiveis = [
    { id: 1, nome: 'Banho', preco: 50 },
    { id: 2, nome: 'Tosa', preco: 70 },
    { id: 3, nome: 'Banho e Tosa', preco: 100 },
    { id: 4, nome: 'Corte de Unhas', preco: 20 }
  ];

  constructor(private fb: FormBuilder) {
    this.agendarForm = this.fb.group({
      petId: ['', Validators.required],
      servicoId: ['', Validators.required],
      data: ['', Validators.required],
      hora: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.agendarForm.valid) {
      console.log('Dados do Agendamento:', this.agendarForm.value);
      alert('Agendamento realizado com sucesso! (Olhe o F12)');
    } else {
      this.agendarForm.markAllAsTouched();
    }
  }
}