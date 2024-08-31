import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Ligadelajusticia1Page } from './ligadelajusticia1.page';

const routes: Routes = [
  {
    path: '',
    component: Ligadelajusticia1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Ligadelajusticia1PageRoutingModule {}
