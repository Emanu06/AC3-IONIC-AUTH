import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PageDetailPageRoutingModule } from './page-detail-routing.module';
// Remova a importação do componente daqui
// import { PageDetailPage } from './page-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageDetailPageRoutingModule
  ],
  // declarations: [PageDetailPage] // <-- REMOVA ESTA LINHA
})
export class PageDetailPageModule {}