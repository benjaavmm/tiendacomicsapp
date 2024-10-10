import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModificarContrasenaPageRoutingModule } from './modificarcontrasena-routing.module';
import { ModificarContrasenaPage } from './modificarcontrasena.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarContrasenaPageRoutingModule
  ],
  declarations: [ModificarContrasenaPage]
})
export class ModificarContrasenaPageModule {}