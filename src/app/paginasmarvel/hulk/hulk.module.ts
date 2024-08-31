import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HulkPageRoutingModule } from './hulk-routing.module';

import { HulkPage } from './hulk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HulkPageRoutingModule
  ],
  declarations: [HulkPage]
})
export class HulkPageModule {}
