import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComicsmarvelPage } from './comicsmarvel.page';

const routes: Routes = [
  {
    path: '',
    component: ComicsmarvelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComicsmarvelPageRoutingModule {}
