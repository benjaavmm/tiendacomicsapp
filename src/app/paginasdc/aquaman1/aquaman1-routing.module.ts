import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Aquaman1Page } from './aquaman1.page';

const routes: Routes = [
  {
    path: '',
    component: Aquaman1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Aquaman1PageRoutingModule {}
