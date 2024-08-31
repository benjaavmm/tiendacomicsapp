import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Supergirl1PageRoutingModule } from './supergirl1-routing.module';

import { Supergirl1Page } from './supergirl1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Supergirl1PageRoutingModule
  ],
  declarations: [Supergirl1Page]
})
export class Supergirl1PageModule {}
