import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Superman1PageRoutingModule } from './superman1-routing.module';

import { Superman1Page } from './superman1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Superman1PageRoutingModule
  ],
  declarations: [Superman1Page]
})
export class Superman1PageModule {}
