import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlackwidowPageRoutingModule } from './blackwidow-routing.module';

import { BlackwidowPage } from './blackwidow.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlackwidowPageRoutingModule
  ],
  declarations: [BlackwidowPage]
})
export class BlackwidowPageModule {}
