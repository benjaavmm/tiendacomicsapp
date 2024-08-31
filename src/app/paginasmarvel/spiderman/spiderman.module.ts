import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpidermanPageRoutingModule } from './spiderman-routing.module';

import { SpidermanPage } from './spiderman.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpidermanPageRoutingModule
  ],
  declarations: [SpidermanPage]
})
export class SpidermanPageModule {}
