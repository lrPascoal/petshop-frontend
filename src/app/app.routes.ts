import { Routes } from '@angular/router';

export const routes: Routes = [
  // Redireciona a página inicial para a lista de pets do tutor
  { path: '', redirectTo: 'tutor/meus-pets', pathMatch: 'full' },

  // Zona do Tutor
  {
    path: 'tutor',
    children: [
      { 
        path: 'meus-pets', 
        loadComponent: () => import('./pages/tutor/meus-pets/meus-pets').then(m => m.MeusPets) 
      },
      { 
        path: 'agendar', 
        loadComponent: () => import('./pages/tutor/agendar/agendar').then(m => m.Agendar) 
      },
    ]
  },

  // Zona do Administrador
  {
    path: 'admin',
    children: [
      { 
        path: 'dashboard', 
        loadComponent: () => import('./pages/admin/dashboard/dashboard').then(m => m.Dashboard) 
      },
      { 
        path: 'servicos', 
        loadComponent: () => import('./pages/admin/gerenciar-servicos/gerenciar-servicos').then(m => m.GerenciarServicos) 
      },
    ]
  }
];