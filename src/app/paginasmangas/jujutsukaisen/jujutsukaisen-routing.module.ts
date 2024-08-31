import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JujutsukaisenPage } from './jujutsukaisen.page';

const routes: Routes = [
  {
    path: '',
    component: JujutsukaisenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JujutsukaisenPageRoutingModule {}
