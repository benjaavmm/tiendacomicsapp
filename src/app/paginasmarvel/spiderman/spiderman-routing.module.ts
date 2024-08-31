import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpidermanPage } from './spiderman.page';

const routes: Routes = [
  {
    path: '',
    component: SpidermanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpidermanPageRoutingModule {}
