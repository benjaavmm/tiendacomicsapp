import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Linternaverde1PageRoutingModule } from './linternaverde1-routing.module';

import { Linternaverde1Page } from './linternaverde1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Linternaverde1PageRoutingModule
  ],
  declarations: [Linternaverde1Page]
})
export class Linternaverde1PageModule {}
