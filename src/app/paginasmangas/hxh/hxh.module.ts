import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HxhPageRoutingModule } from './hxh-routing.module';

import { HxhPage } from './hxh.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HxhPageRoutingModule
  ],
  declarations: [HxhPage]
})
export class HxhPageModule {}
