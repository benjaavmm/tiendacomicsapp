import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyheroacademiaPageRoutingModule } from './myheroacademia-routing.module';

import { MyheroacademiaPage } from './myheroacademia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyheroacademiaPageRoutingModule
  ],
  declarations: [MyheroacademiaPage]
})
export class MyheroacademiaPageModule {}
