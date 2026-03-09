import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Componentes do Angular Material para o visual do formulário
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-pet-form',
  standalone: true,
  // Precisamos importar o ReactiveFormsModule para o formulário funcionar
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './pet-form.html',
  styleUrl: './pet-form.css'
})
export class PetForm {
  // A variável que vai guardar o estado de todos os campos do formulário
  petForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Campos e as validações (Validators.required - não pode ficar em branco)
    this.petForm = this.fb.group({
      nome: ['', Validators.required],
      especie: ['', Validators.required],
      raca: ['', Validators.required],
      peso: ['', [Validators.required, Validators.min(0.1)]] // Peso tem que ser preenchido e maior que zero
    });
  }

  // Função - botão "Salvar"
  onSubmit() {
    if (this.petForm.valid) {
      //console do navegador.
      //dados para o back-end em Java!
      console.log('Dados do Novo Pet:', this.petForm.value);
      alert('Pet validado com sucesso! (Pressione F12 e olhe a aba Console)');
    } else {
      // Se o usuário tentar burlar algo, marcamos todos os campos para mostrar os erros em vermelho
      this.petForm.markAllAsTouched();
    }
  }
}