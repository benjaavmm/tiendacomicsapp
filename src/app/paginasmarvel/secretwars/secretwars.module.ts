import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SecretwarsPageRoutingModule } from './secretwars-routing.module';

import { SecretwarsPage } from './secretwars.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SecretwarsPageRoutingModule
  ],
  declarations: [SecretwarsPage]
})
export class SecretwarsPageModule {}
