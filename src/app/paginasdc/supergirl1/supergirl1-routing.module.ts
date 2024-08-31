import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Supergirl1Page } from './supergirl1.page';

const routes: Routes = [
  {
    path: '',
    component: Supergirl1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Supergirl1PageRoutingModule {}
