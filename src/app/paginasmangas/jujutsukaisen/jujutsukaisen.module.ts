import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JujutsukaisenPageRoutingModule } from './jujutsukaisen-routing.module';

import { JujutsukaisenPage } from './jujutsukaisen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JujutsukaisenPageRoutingModule
  ],
  declarations: [JujutsukaisenPage]
})
export class JujutsukaisenPageModule {}
