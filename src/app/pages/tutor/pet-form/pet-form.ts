import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

// Importando o Serviço e o Modelo
import { PetService } from '../../../services/pet';
import { Pet } from '../../../models/model';

@Component({
  selector: 'app-pet-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule
  ],
  templateUrl: './pet-form.html',
  styleUrl: './pet-form.css'
})
export class PetForm {
  petForm: FormGroup;

  // Injetamos o FormBuilder, o PetService e o Router (para mudar de tela via código)
  constructor(
    private fb: FormBuilder,
    private petService: PetService,
    private router: Router 
  ) {
    this.petForm = this.fb.group({
      nome: ['', Validators.required],
      especie: ['', Validators.required],
      raca: ['', Validators.required],
      peso: ['', [Validators.required, Validators.min(0.1)]]
    });
  }

  onSubmit() {
    if (this.petForm.valid) {
      // 1. Pega os dados validados do formulário
      const dadosDoFormulario = this.petForm.value;

      // 2. Monta o objeto Pet novo (sem ID, pois o Service vai gerar)
      const novoPet: Pet = {
        id: 0,
        nome: dadosDoFormulario.nome,
        especie: dadosDoFormulario.especie,
        raca: dadosDoFormulario.raca,
        peso: dadosDoFormulario.peso,
        tutorId: 1 // Simulando o ID do tutor logado
      };

      // 3. Manda o Serviço salvar
      this.petService.adicionarPet(novoPet);

      // 4. Volta automaticamente para a tela da tabela para ver o resultado!
      this.router.navigate(['/tutor/meus-pets']);
      
    } else {
      this.petForm.markAllAsTouched();
    }
  }
}