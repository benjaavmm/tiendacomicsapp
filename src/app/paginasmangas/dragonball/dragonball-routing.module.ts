import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DragonballPage } from './dragonball.page';

const routes: Routes = [
  {
    path: '',
    component: DragonballPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DragonballPageRoutingModule {}
