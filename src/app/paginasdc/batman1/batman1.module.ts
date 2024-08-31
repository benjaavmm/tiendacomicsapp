import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Batman1PageRoutingModule } from './batman1-routing.module';

import { Batman1Page } from './batman1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Batman1PageRoutingModule
  ],
  declarations: [Batman1Page]
})
export class Batman1PageModule {}
