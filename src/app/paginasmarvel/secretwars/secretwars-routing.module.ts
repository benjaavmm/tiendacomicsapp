import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecretwarsPage } from './secretwars.page';

const routes: Routes = [
  {
    path: '',
    component: SecretwarsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecretwarsPageRoutingModule {}
