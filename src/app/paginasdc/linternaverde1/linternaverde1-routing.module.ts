import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Linternaverde1Page } from './linternaverde1.page';

const routes: Routes = [
  {
    path: '',
    component: Linternaverde1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Linternaverde1PageRoutingModule {}
