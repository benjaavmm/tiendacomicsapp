import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NarutoPageRoutingModule } from './naruto-routing.module';

import { NarutoPage } from './naruto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NarutoPageRoutingModule
  ],
  declarations: [NarutoPage]
})
export class NarutoPageModule {}
