import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Flash1Page } from './flash1.page';

const routes: Routes = [
  {
    path: '',
    component: Flash1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Flash1PageRoutingModule {}
