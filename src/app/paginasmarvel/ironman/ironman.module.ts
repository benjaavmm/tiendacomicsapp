import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IronmanPageRoutingModule } from './ironman-routing.module';

import { IronmanPage } from './ironman.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IronmanPageRoutingModule
  ],
  declarations: [IronmanPage]
})
export class IronmanPageModule {}
