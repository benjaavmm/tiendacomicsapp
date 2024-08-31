import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Aquaman1PageRoutingModule } from './aquaman1-routing.module';

import { Aquaman1Page } from './aquaman1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Aquaman1PageRoutingModule
  ],
  declarations: [Aquaman1Page]
})
export class Aquaman1PageModule {}
