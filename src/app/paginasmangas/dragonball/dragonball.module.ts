import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DragonballPageRoutingModule } from './dragonball-routing.module';

import { DragonballPage } from './dragonball.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DragonballPageRoutingModule
  ],
  declarations: [DragonballPage]
})
export class DragonballPageModule {}
