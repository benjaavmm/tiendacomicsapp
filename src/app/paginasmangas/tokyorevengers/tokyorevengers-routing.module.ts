import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TokyorevengersPage } from './tokyorevengers.page';

const routes: Routes = [
  {
    path: '',
    component: TokyorevengersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TokyorevengersPageRoutingModule {}
