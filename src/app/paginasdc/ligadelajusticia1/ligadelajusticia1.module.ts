import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Ligadelajusticia1PageRoutingModule } from './ligadelajusticia1-routing.module';

import { Ligadelajusticia1Page } from './ligadelajusticia1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ligadelajusticia1PageRoutingModule
  ],
  declarations: [Ligadelajusticia1Page]
})
export class Ligadelajusticia1PageModule {}
