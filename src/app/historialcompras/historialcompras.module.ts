import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HistorialcomprasRoutingModule } from './historialcompras-routing.module';
import { HistorialComprasPage } from './historialcompras.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialcomprasRoutingModule
  ],
  declarations: [HistorialComprasPage]
})
export class HistorialcomprasModule {}
