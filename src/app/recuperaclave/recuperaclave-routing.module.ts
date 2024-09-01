import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperaclavePage } from './recuperaclave.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperaclavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperaclavePageRoutingModule {}
