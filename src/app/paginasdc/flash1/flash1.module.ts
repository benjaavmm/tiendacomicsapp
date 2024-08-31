import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Flash1PageRoutingModule } from './flash1-routing.module';

import { Flash1Page } from './flash1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Flash1PageRoutingModule
  ],
  declarations: [Flash1Page]
})
export class Flash1PageModule {}
