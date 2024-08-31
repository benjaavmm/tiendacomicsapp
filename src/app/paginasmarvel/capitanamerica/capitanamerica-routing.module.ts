import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CapitanamericaPage } from './capitanamerica.page';

const routes: Routes = [
  {
    path: '',
    component: CapitanamericaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CapitanamericaPageRoutingModule {}
