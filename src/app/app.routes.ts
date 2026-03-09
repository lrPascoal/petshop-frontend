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
        loadComponent: () => import('./pages/tutor/meus-pets/meus-pets.component').then(m => m.MeusPetsComponent) 
      },
      { 
        path: 'agendar', 
        loadComponent: () => import('./pages/tutor/agendar/agendar.component').then(m => m.AgendarComponent) 
      },
    ]
  },

  // Zona do Administrador
  {
    path: 'admin',
    children: [
      { 
        path: 'dashboard', 
        loadComponent: () => import('./pages/admin/dashboard/dashboard.component').then(m => m.DashboardComponent) 
      },
      { 
        path: 'servicos', 
        loadComponent: () => import('./pages/admin/gerenciar-servicos/gerenciar-servicos.component').then(m => m.GerenciarServicosComponent) 
      },
    ]
  }
];