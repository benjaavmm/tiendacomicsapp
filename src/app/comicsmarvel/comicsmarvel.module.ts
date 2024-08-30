import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComicsmarvelPageRoutingModule } from './comicsmarvel-routing.module';

import { ComicsmarvelPage } from './comicsmarvel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComicsmarvelPageRoutingModule
  ],
  declarations: [ComicsmarvelPage]
})
export class ComicsmarvelPageModule {}
