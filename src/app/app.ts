import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router } from '@angular/router';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

// Importe o ThemeService
import { AuthService } from './services/auth'; 
import { ThemeService } from './services/theme.service'; // Ajuste o caminho se necessário

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    RouterModule, 
    MatToolbarModule, 
    MatButtonModule, // Necessário para o mat-fab e mat-icon-button
    MatIconModule,
    MatMenuModule,
    MatDividerModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App { 
  title = 'PetShop System';

  // Injetamos o AuthService e o ThemeService como public
  constructor(
    public authService: AuthService, 
    public themeService: ThemeService, // Agora o HTML consegue acessar o darkMode() e toggleTheme()
    private router: Router
  ) {}

  /**
   * Método centralizado de saída.
   */
  logout(): void {
    console.log('Encerrando sessão do usuário...');
    this.authService.fazerLogout();
    this.router.navigate(['/login']);
  }
}