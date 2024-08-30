import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComicsdcPageRoutingModule } from './comicsdc-routing.module';

import { ComicsdcPage } from './comicsdc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComicsdcPageRoutingModule
  ],
  declarations: [ComicsdcPage]
})
export class ComicsdcPageModule {}
