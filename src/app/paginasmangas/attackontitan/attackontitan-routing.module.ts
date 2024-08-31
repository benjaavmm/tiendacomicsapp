import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttackontitanPage } from './attackontitan.page';

const routes: Routes = [
  {
    path: '',
    component: AttackontitanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttackontitanPageRoutingModule {}
