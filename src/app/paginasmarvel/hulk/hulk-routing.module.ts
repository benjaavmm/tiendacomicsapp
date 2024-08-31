import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HulkPage } from './hulk.page';

const routes: Routes = [
  {
    path: '',
    component: HulkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HulkPageRoutingModule {}
