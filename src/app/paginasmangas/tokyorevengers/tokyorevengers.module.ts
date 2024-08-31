import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TokyorevengersPageRoutingModule } from './tokyorevengers-routing.module';

import { TokyorevengersPage } from './tokyorevengers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TokyorevengersPageRoutingModule
  ],
  declarations: [TokyorevengersPage]
})
export class TokyorevengersPageModule {}
