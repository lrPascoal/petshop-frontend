import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Componentes do Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatCardModule, 
    MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm: FormGroup;
  mensagemErro = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  entrar() {
    if (this.loginForm.valid) {
      const { email, senha } = this.loginForm.value;
      const sucesso = this.authService.fazerLogin(email, senha);

      if (sucesso) {
        // Pega o perfil para saber para qual tela mandar
        const perfil = this.authService.getPerfilAtual();
        if (perfil === 'ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/tutor/meus-pets']);
        }
      } else {
        this.mensagemErro = 'E-mail ou senha incorretos. Tente novamente.';
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}