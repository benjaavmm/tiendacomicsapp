import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DemonslayerPageRoutingModule } from './demonslayer-routing.module';

import { DemonslayerPage } from './demonslayer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DemonslayerPageRoutingModule
  ],
  declarations: [DemonslayerPage]
})
export class DemonslayerPageModule {}
