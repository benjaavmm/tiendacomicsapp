import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AntmanPage } from './antman.page';

const routes: Routes = [
  {
    path: '',
    component: AntmanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AntmanPageRoutingModule {}
