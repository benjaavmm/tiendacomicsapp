import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlackwidowPage } from './blackwidow.page';

const routes: Routes = [
  {
    path: '',
    component: BlackwidowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlackwidowPageRoutingModule {}
