import { Routes } from '@angular/router';
// Importamos o nosso segurança
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  // 1. Rota Padrão: Se digitar só localhost:4200, vai pro login
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },

  // 2. A Rota Pública (Tela de Login)
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.Login)
  },

  // 3. Zona do Admin (TOTALMENTE PROTEGIDA PELO GUARD)
  {
    path: 'admin',
    canActivate: [authGuard], // <--- O SEGURANÇA FICA AQUI
    children: [
      { 
        path: 'dashboard', 
        loadComponent: () => import('./pages/admin/dashboard/dashboard').then(m => m.Dashboard) 
      },
      { 
        path: 'servicos', 
        loadComponent: () => import('./pages/admin/gerenciar-servicos/gerenciar-servicos').then(m => m.GerenciarServicos) 
      }
    ]
  },

  // 4. Zona do Tutor (TOTALMENTE PROTEGIDA PELO GUARD)
  {
    path: 'tutor',
    canActivate: [authGuard], // <--- O SEGURANÇA FICA AQUI TAMBÉM
    children: [
      { 
        path: 'meus-pets', 
        loadComponent: () => import('./pages/tutor/meus-pets/meus-pets').then(m => m.MeusPets) 
      },
      { 
        path: 'novo-pet', 
        loadComponent: () => import('./pages/tutor/pet-form/pet-form').then(m => m.PetForm) 
      },
      { 
        path: 'editar-pet/:id', 
        loadComponent: () => import('./pages/tutor/pet-form/pet-form').then(m => m.PetForm) 
      },
      { 
        path: 'agendar', 
        loadComponent: () => import('./pages/tutor/agendar/agendar').then(m => m.Agendar) 
      },
    ]
  }
];