import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    // Rota da Home corrigida para carregar um componente standalone
    path: 'home',
    loadComponent: () => import('./home/home.page').then( c => c.HomePage)
  },
  // As rotas abaixo provavelmente também são para componentes standalone
  // e podem precisar da mesma correção se derem o mesmo problema.
  // Por agora, vamos focar na home.
  {
    path: 'page-detail',
    loadChildren: () => import('./pages/page-detail/page-detail.module').then( m => m.PageDetailPageModule)
  },
  {
    path: 'page-detail/:id',
    loadChildren: () => import('./pages/page-detail/page-detail.module').then( m => m.PageDetailPageModule)
  },
  {
    path: 'cuidador-detail',
    loadChildren: () => import('./pages/cuidador-detail/cuidador-detail.module').then( m => m.CuidadorDetailPageModule)
  },
  {
    path: 'cuidador-detail/:id',
    loadChildren: () => import('./pages/cuidador-detail/cuidador-detail.module').then( m => m.CuidadorDetailPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }