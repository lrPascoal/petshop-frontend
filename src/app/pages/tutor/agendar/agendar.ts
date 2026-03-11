import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { PetService } from '../../../services/pet';
import { ServicosPetService, Servico } from '../../../services/servicos-pet';
import { AgendamentoService } from '../../../services/agendamento';
import { Pet, Agendamento } from '../../../models/model';

@Component({
  selector: 'app-agendar',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatFormFieldModule, 
    MatInputModule, MatSelectModule, MatButtonModule, MatCardModule
  ],
  templateUrl: './agendar.html',
  styleUrl: './agendar.css'
})
export class Agendar implements OnInit {
  agendamentoForm: FormGroup;
  meusPets: Pet[] = [];
  servicosDisponiveis: Servico[] = [];

  constructor(
    private fb: FormBuilder,
    private petService: PetService,
    private servicoService: ServicosPetService,
    private agendamentoService: AgendamentoService,
    private router: Router
  ) {
    this.agendamentoForm = this.fb.group({
      pet: [null, Validators.required],
      servico: [null, Validators.required],
      dataHora: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Busca Pets e Serviços para preencher os campos de seleção
    this.petService.getPets().subscribe(dados => this.meusPets = dados);
    this.servicoService.getServicos().subscribe(dados => this.servicosDisponiveis = dados);
  }

  onSubmit(): void {
    if (this.agendamentoForm.valid) {
      const form = this.agendamentoForm.value;
      
      const novoAgendamento: Agendamento = {
        petId: form.pet.id,
        petNome: form.pet.nome,
        servicoId: form.servico.id,
        servicoNome: form.servico.nome,
        dataHora: form.dataHora,
        status: 'Aguardando'
      };

      this.agendamentoService.agendar(novoAgendamento).subscribe(() => {
        alert('Agendamento realizado com sucesso! 🐾');
        this.router.navigate(['/tutor/meus-pets']);
      });
    }
  }
}