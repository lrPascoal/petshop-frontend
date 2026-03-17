import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router } from '@angular/router';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

import { AuthService } from './services/auth'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    RouterModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    MatMenuModule,
    MatDividerModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App { 
  title = 'PetShop System';

  // Injetamos o AuthService como public para o template HTML acessar as propriedades de login
  constructor(
    public authService: AuthService, 
    private router: Router
  ) {}

  /**
   * Método centralizado de saída.
   * Ele utiliza a lógica do serviço e redireciona o usuário.
   */
  logout(): void {
    console.log('Encerrando sessão do usuário...');
    
    // 1. Chama a limpeza de dados no serviço (que deve conter o localStorage.removeItem)
    this.authService.fazerLogout();
    
    // 2. Redireciona para a tela de login
    this.router.navigate(['/login']);
  }
}