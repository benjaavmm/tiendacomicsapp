import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HxhPage } from './hxh.page';

const routes: Routes = [
  {
    path: '',
    component: HxhPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HxhPageRoutingModule {}
