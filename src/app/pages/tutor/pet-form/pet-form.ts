import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// Adicionamos o ActivatedRoute aqui
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
export class PetForm implements OnInit { // Adicionamos o OnInit
  petForm: FormGroup;
  
  // Variável para guardar o ID caso estejamos no modo "Edição"
  petIdEdicao: number | null = null; 

  constructor(
    private fb: FormBuilder,
    private petService: PetService,
    private router: Router,
    private route: ActivatedRoute // Ferramenta para ler a URL atual
  ) {
    this.petForm = this.fb.group({
      nome: ['', Validators.required],
      especie: ['', Validators.required],
      raca: ['', Validators.required],
      peso: ['', [Validators.required, Validators.min(0.1)]]
    });
  }

  // Roda assim que a tela abre
  ngOnInit(): void {
    // 1. Olha para a URL e tenta pegar o parâmetro 'id'
    const idParam = this.route.snapshot.paramMap.get('id');
    
    // 2. Se o ID existir na URL, significa que entramos pelo botão "Editar"
    if (idParam) {
      this.petIdEdicao = Number(idParam); // Converte de texto para número
      
      // 3. Pede para o gerente (Service) buscar os dados desse pet
      const petParaEditar = this.petService.getPetById(this.petIdEdicao);

      if (petParaEditar) {
        // 4. MÁGICA: O patchValue preenche os campos do formulário automaticamente!
        this.petForm.patchValue({
          nome: petParaEditar.nome,
          especie: petParaEditar.especie,
          raca: petParaEditar.raca,
          peso: petParaEditar.peso
        });
      }
    }
  }

  onSubmit() {
    if (this.petForm.valid) {
      const dadosDoFormulario = this.petForm.value;

      // Se temos um ID guardado, o botão clicado foi o de Atualizar
      if (this.petIdEdicao) {
        const petAtualizado: Pet = {
          id: this.petIdEdicao,
          nome: dadosDoFormulario.nome,
          especie: dadosDoFormulario.especie,
          raca: dadosDoFormulario.raca,
          peso: dadosDoFormulario.peso,
          tutorId: 1
        };
        this.petService.atualizarPet(petAtualizado);
      
      // Se NÃO temos ID, o botão clicado foi o de Salvar (Novo Pet)
      } else {
        const novoPet: Pet = {
          id: 0,
          nome: dadosDoFormulario.nome,
          especie: dadosDoFormulario.especie,
          raca: dadosDoFormulario.raca,
          peso: dadosDoFormulario.peso,
          tutorId: 1
        };
        this.petService.adicionarPet(novoPet);
      }

      // De qualquer forma, volta para a tabela no final
      this.router.navigate(['/tutor/meus-pets']);
      
    } else {
      this.petForm.markAllAsTouched();
    }
  }
}