import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Superman1Page } from './superman1.page';

const routes: Routes = [
  {
    path: '',
    component: Superman1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Superman1PageRoutingModule {}
