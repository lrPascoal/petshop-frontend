import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

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
export class PetForm implements OnInit {
  petForm: FormGroup;
  petIdEdicao: number | null = null; 

  constructor(
    private fb: FormBuilder,
    private petService: PetService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.petForm = this.fb.group({
      nome: ['', Validators.required],
      especie: ['', Validators.required],
      raca: ['', Validators.required],
      peso: ['', [Validators.required, Validators.min(0.1)]]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    
    if (idParam) {
      this.petIdEdicao = Number(idParam);
      
      // MUDANÇA AQUI: Agora nos inscrevemos para receber o pet do servidor
      this.petService.getPetById(this.petIdEdicao).subscribe({
        next: (petParaEditar) => {
          this.petForm.patchValue({
            nome: petParaEditar.nome,
            especie: petParaEditar.especie,
            raca: petParaEditar.raca,
            peso: petParaEditar.peso
          });
        },
        error: (err) => console.error('Erro ao buscar pet para edição', err)
      });
    }
  }

  onSubmit() {
    if (this.petForm.valid) {
      const dadosDoFormulario = this.petForm.value;

      if (this.petIdEdicao) {
        // MODO EDIÇÃO (PUT)
        const petAtualizado: Pet = {
          ...dadosDoFormulario, // Pega todos os campos do form
          id: this.petIdEdicao,
          tutorId: 1
        };
        
        // MUDANÇA AQUI: Aguardamos a resposta do servidor antes de navegar
        this.petService.atualizarPet(petAtualizado).subscribe(() => {
          this.router.navigate(['/tutor/meus-pets']);
        });
      
      } else {
        // MODO CADASTRO (POST)
        const novoPet: Pet = {
          ...dadosDoFormulario,
          id: 0, // O JSON Server/Banco de dados vai gerar o ID real
          tutorId: 1
        };
        
        // MUDANÇA AQUI: Aguardamos a resposta do servidor antes de navegar
        this.petService.adicionarPet(novoPet).subscribe(() => {
          this.router.navigate(['/tutor/meus-pets']);
        });
      }
      
    } else {
      this.petForm.markAllAsTouched();
    }
  }
}