import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NarutoPage } from './naruto.page';

const routes: Routes = [
  {
    path: '',
    component: NarutoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NarutoPageRoutingModule {}
