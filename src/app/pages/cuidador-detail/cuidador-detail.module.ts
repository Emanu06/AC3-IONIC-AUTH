import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CuidadorDetailPageRoutingModule } from './cuidador-detail-routing.module';
// Remova a importação do componente daqui
// import { CuidadorDetailPage } from './cuidador-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuidadorDetailPageRoutingModule
  ],
  // declarations: [CuidadorDetailPage] // <-- REMOVA ESTA LINHA
})
export class CuidadorDetailPageModule {}