import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModificarContrasenaPage } from './modificarcontrasena.page'; // Asegúrate de usar el nombre correcto

const routes: Routes = [
  {
    path: '',
    component: ModificarContrasenaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModificarContrasenaPageRoutingModule {}
