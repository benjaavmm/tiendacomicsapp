import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemonslayerPage } from './demonslayer.page';

const routes: Routes = [
  {
    path: '',
    component: DemonslayerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemonslayerPageRoutingModule {}
