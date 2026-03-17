import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// Componentes Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { PetService } from '../../../services/pet';
import { Pet } from '../../../models/model';

@Component({
  selector: 'app-pet-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RouterModule, 
    MatSnackBarModule,
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatButtonModule, 
    MatIconModule
  ],
  templateUrl: './pet-form.html', // Verifique se o arquivo pet-form.html está nesta mesma pasta
  styleUrl: './pet-form.css'      // Verifique se o arquivo pet-form.css está nesta mesma pasta
})
export class PetForm implements OnInit {
  petForm: FormGroup;
  editMode = false;
  petId: number | null = null;
  carregando = false;

  constructor(
    private fb: FormBuilder,
    private petService: PetService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    // Inicialização do formulário com validações
    this.petForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      especie: ['Cachorro', Validators.required],
      raca: ['', Validators.required],
      peso: [null, [Validators.required, Validators.min(0.1)]]
    });
  }

  ngOnInit(): void {
    // Captura o ID da URL para definir se é EDIÇÃO ou CADASTRO
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.editMode = true;
      this.petId = +id; // Converte string para número
      this.carregarDadosParaEdicao(this.petId);
    }
  }

  carregarDadosParaEdicao(id: number) {
    this.petService.getPetById(id).subscribe({
      next: (pet: Pet) => {
        this.petForm.patchValue(pet);
      },
      error: (err: any) => {
        console.error('Erro ao buscar pet:', err);
        this.notificar('Erro ao carregar dados do pet.', true);
      }
    });
  }

  salvar() {
    if (this.petForm.valid) {
      this.carregando = true;
      
      // Montagem do objeto Pet conforme esperado pelo serviço
      const dadosPet: Pet = {
        ...this.petForm.value,
        id: this.editMode ? this.petId : undefined
      };

      // Define se chama atualizar ou adicionar
      const operacao = (this.editMode && this.petId)
        ? this.petService.atualizarPet(dadosPet) 
        : this.petService.adicionarPet(dadosPet);

      operacao.subscribe({
        next: () => {
          this.notificar(this.editMode ? 'Pet atualizado!' : 'Pet cadastrado com sucesso!');
          this.router.navigate(['/tutor/meus-pets']);
        },
        error: (err: any) => {
          console.error('Erro na requisição:', err);
          this.carregando = false;
          this.notificar('Erro ao processar no servidor. Tente novamente.', true);
        }
      });
    }
  }

  private notificar(msg: string, isErro = false) {
    this.snackBar.open(msg, 'Fechar', {
      duration: 3000,
      panelClass: isErro ? ['erro-snackbar'] : ['sucesso-snackbar']
    });
  }
}