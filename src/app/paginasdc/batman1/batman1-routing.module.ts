import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Batman1Page } from './batman1.page';

const routes: Routes = [
  {
    path: '',
    component: Batman1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Batman1PageRoutingModule {}
