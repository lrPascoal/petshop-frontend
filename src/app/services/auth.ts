import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Guarda o perfil do usuário logado: 'ADMIN', 'TUTOR' ou null (deslogado)
  private perfilLogado: string | null = null;

  constructor() {}

  // Simulação de login no Banco de Dados
  fazerLogin(email: string, senha: string): boolean {
    if (email === 'admin@petshop.com' && senha === '123') {
      this.perfilLogado = 'ADMIN';
      console.log('Login efetuado como Administrador');
      return true;
    } else if (email === 'tutor@email.com' && senha === '123') {
      this.perfilLogado = 'TUTOR';
      console.log('Login efetuado como Tutor');
      return true;
    }

    return false; // Senha ou email errados
  }

  fazerLogout() {
    localStorage.removeItem('userPetShop');
    this.perfilLogado = null; // Ajustado de 'usuarioLogado' para 'perfilLogado'
    console.log('Usuário deslogado.');
  }

  getPerfilAtual(): string | null {
    return this.perfilLogado;
  }

  isLogado(): boolean {
    return this.perfilLogado !== null;
  }
}
