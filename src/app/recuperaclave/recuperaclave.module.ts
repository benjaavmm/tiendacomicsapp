import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperaclavePageRoutingModule } from './recuperaclave-routing.module';

import { RecuperaclavePage } from './recuperaclave.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperaclavePageRoutingModule
  ],
  declarations: [RecuperaclavePage]
})
export class RecuperaclavePageModule {}
