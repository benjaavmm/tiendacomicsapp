import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistorialCompraPage } from './historialcompras.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialCompraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialcomprasRoutingModule {}
