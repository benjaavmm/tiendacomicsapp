import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CapitanamericaPageRoutingModule } from './capitanamerica-routing.module';

import { CapitanamericaPage } from './capitanamerica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CapitanamericaPageRoutingModule
  ],
  declarations: [CapitanamericaPage]
})
export class CapitanamericaPageModule {}
