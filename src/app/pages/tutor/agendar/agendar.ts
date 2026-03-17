import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Serviços e Models
import { PetService } from '../../../services/pet';
import { ServicosPetService } from '../../../services/servicos-pet';
import { AgendamentoService } from '../../../services/agendamento';
import { Pet, Servico } from '../../../models/model';

@Component({
  selector: 'app-agendar',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule, MatSnackBarModule,
    MatCardModule, MatFormFieldModule, MatInputModule, 
    MatSelectModule, MatButtonModule, MatIconModule
  ],
  templateUrl: './agendar.html',
  styleUrl: './agendar.css'
})
export class Agendar implements OnInit {
  agendamentoForm: FormGroup;
  meusPets: Pet[] = [];
  servicosDisponiveis: Servico[] = [];
  enviando = false;
  hoje = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private petService: PetService,
    private servicosService: ServicosPetService,
    private agendamentoService: AgendamentoService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.agendamentoForm = this.fb.group({
      petId: ['', Validators.required],
      servicoId: ['', Validators.required],
      data: ['', Validators.required],
      hora: ['', Validators.required],
      status: ['Aguardando']
    });
  }

  ngOnInit(): void {
    this.carregarDadosIniciais();
  }

  carregarDadosIniciais() {
    this.petService.getPets().subscribe({
      next: (res) => this.meusPets = res,
      error: () => this.notificar('Erro ao carregar seus pets.', true)
    });

    this.servicosService.getServicos().subscribe({
      next: (res) => this.servicosDisponiveis = res,
      error: () => this.notificar('Erro ao carregar serviços.', true)
    });
  }

  confirmarAgendamento() {
    if (this.agendamentoForm.valid) {
      this.enviando = true;
      
      // --- O AJUSTE ESTÁ AQUI ---
      // 1. Buscamos o pet e o serviço completos nas nossas listas usando os IDs do formulário
      const petEscolhido = this.meusPets.find(p => p.id === this.agendamentoForm.value.petId);
      const servicoEscolhido = this.servicosDisponiveis.find(s => s.id === this.agendamentoForm.value.servicoId);

      // 2. Criamos o objeto que será salvo na API incluindo os NOMES
      const dadosParaSalvar = {
        ...this.agendamentoForm.value,
        petNome: petEscolhido?.nome,        // <-- Agora o Admin tem o nome do pet
        servicoNome: servicoEscolhido?.nome, // <-- Agora o Admin tem o nome do serviço
        dataHora: `${this.agendamentoForm.value.data}T${this.agendamentoForm.value.hora}:00`
      };

      this.agendamentoService.criarAgendamento(dadosParaSalvar).subscribe({
        next: () => {
          this.notificar('Agendamento realizado com sucesso!');
          this.router.navigate(['/tutor/meus-pets']);
        },
        error: () => {
          this.enviando = false;
          this.notificar('Erro ao salvar agendamento.', true);
        }
      });
    }
  }

  private notificar(msg: string, isErro = false) {
    this.snackBar.open(msg, 'Fechar', { duration: 3000, panelClass: isErro ? ['erro-snackbar'] : ['sucesso-snackbar'] });
  }
}