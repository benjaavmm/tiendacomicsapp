import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IronmanPage } from './ironman.page';

const routes: Routes = [
  {
    path: '',
    component: IronmanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IronmanPageRoutingModule {}
