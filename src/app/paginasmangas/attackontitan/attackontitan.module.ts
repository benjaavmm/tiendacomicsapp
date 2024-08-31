import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttackontitanPageRoutingModule } from './attackontitan-routing.module';

import { AttackontitanPage } from './attackontitan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttackontitanPageRoutingModule
  ],
  declarations: [AttackontitanPage]
})
export class AttackontitanPageModule {}
