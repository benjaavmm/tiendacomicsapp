import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'registro', loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule) },
  { path: 'mangas', loadChildren: () => import('./mangas/mangas.module').then( m => m.MangasPageModule)},
  { path: 'comicsmarvel', loadChildren: () => import('./comicsmarvel/comicsmarvel.module').then( m => m.ComicsmarvelPageModule)},
  { path: 'comicsdc',loadChildren: () => import('./comicsdc/comicsdc.module').then( m => m.ComicsdcPageModule)},


  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
