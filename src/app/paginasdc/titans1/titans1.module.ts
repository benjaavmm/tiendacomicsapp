import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Titans1PageRoutingModule } from './titans1-routing.module';

import { Titans1Page } from './titans1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Titans1PageRoutingModule
  ],
  declarations: [Titans1Page]
})
export class Titans1PageModule {}
