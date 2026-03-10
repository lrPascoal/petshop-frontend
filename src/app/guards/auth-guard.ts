import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

// Esta é a função que o Angular vai rodar antes de abrir uma tela protegida
export const authGuard: CanActivateFn = (route, state) => {
  // Como é uma função solta (não é uma classe), usamos o 'inject' para puxar o Serviço e o Roteador
  const authService = inject(AuthService);
  const router = inject(Router);

  // Pergunta ao gerente de autenticação se o usuário está logado
  if (authService.isLogado()) {
    return true; // Acesso liberado! A tela vai carregar.
  } else {
    // Acesso negado! Redireciona para a tela de login.
    router.navigate(['/login']);
    return false; 
  }
};