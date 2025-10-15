import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuidadorDetailPage } from './cuidador-detail.page';

const routes: Routes = [
  {
    path: '',
    component: CuidadorDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuidadorDetailPageRoutingModule {}
