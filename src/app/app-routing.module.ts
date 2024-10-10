import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'registro', loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule) },
  { path: 'mangas', loadChildren: () => import('./mangas/mangas.module').then(m => m.MangasPageModule) },
  { path: 'comicsmarvel', loadChildren: () => import('./comicsmarvel/comicsmarvel.module').then(m => m.ComicsmarvelPageModule) },
  { path: 'comicsdc', loadChildren: () => import('./comicsdc/comicsdc.module').then(m => m.ComicsdcPageModule) },
  {
    path: 'flash1',
    loadChildren: () => import('./paginasdc/flash1/flash1.module').then(m => m.Flash1PageModule)
  },
  {
    path: 'linternaverde1',
    loadChildren: () => import('./paginasdc/linternaverde1/linternaverde1.module').then(m => m.Linternaverde1PageModule)
  },
  {
    path: 'batman1',
    loadChildren: () => import('./paginasdc/batman1/batman1.module').then(m => m.Batman1PageModule)
  },
  {
    path: 'aquaman1',
    loadChildren: () => import('./paginasdc/aquaman1/aquaman1.module').then(m => m.Aquaman1PageModule)
  },
  {
    path: 'ligadelajusticia1',
    loadChildren: () => import('./paginasdc/ligadelajusticia1/ligadelajusticia1.module').then(m => m.Ligadelajusticia1PageModule)
  },
  {
    path: 'supergirl1',
    loadChildren: () => import('./paginasdc/supergirl1/supergirl1.module').then(m => m.Supergirl1PageModule)
  },
  {
    path: 'superman1',
    loadChildren: () => import('./paginasdc/superman1/superman1.module').then(m => m.Superman1PageModule)
  },
  {
    path: 'titans1',
    loadChildren: () => import('./paginasdc/titans1/titans1.module').then(m => m.Titans1PageModule)
  },
  {
    path: 'naruto',
    loadChildren: () => import('./paginasmangas/naruto/naruto.module').then(m => m.NarutoPageModule)
  },
  {
    path: 'demonslayer',
    loadChildren: () => import('./paginasmangas/demonslayer/demonslayer.module').then(m => m.DemonslayerPageModule)
  },
  {
    path: 'dragonball',
    loadChildren: () => import('./paginasmangas/dragonball/dragonball.module').then(m => m.DragonballPageModule)
  },
  {
    path: 'jujutsukaisen',
    loadChildren: () => import('./paginasmangas/jujutsukaisen/jujutsukaisen.module').then(m => m.JujutsukaisenPageModule)
  },
  {
    path: 'tokyorevengers',
    loadChildren: () => import('./paginasmangas/tokyorevengers/tokyorevengers.module').then(m => m.TokyorevengersPageModule)
  },
  {
    path: 'myheroacademia',
    loadChildren: () => import('./paginasmangas/myheroacademia/myheroacademia.module').then(m => m.MyheroacademiaPageModule)
  },
  {
    path: 'attackontitan',
    loadChildren: () => import('./paginasmangas/attackontitan/attackontitan.module').then(m => m.AttackontitanPageModule)
  },
  {
    path: 'hxh',
    loadChildren: () => import('./paginasmangas/hxh/hxh.module').then(m => m.HxhPageModule)
  },
  {
    path: 'hulk',
    loadChildren: () => import('./paginasmarvel/hulk/hulk.module').then(m => m.HulkPageModule)
  },
  {
    path: 'spiderman',
    loadChildren: () => import('./paginasmarvel/spiderman/spiderman.module').then(m => m.SpidermanPageModule)
  },
  {
    path: 'antman',
    loadChildren: () => import('./paginasmarvel/antman/antman.module').then(m => m.AntmanPageModule)
  },
  {
    path: 'capitanamerica',
    loadChildren: () => import('./paginasmarvel/capitanamerica/capitanamerica.module').then(m => m.CapitanamericaPageModule)
  },
  {
    path: 'secretwars',
    loadChildren: () => import('./paginasmarvel/secretwars/secretwars.module').then(m => m.SecretwarsPageModule)
  },
  {
    path: 'ironman',
    loadChildren: () => import('./paginasmarvel/ironman/ironman.module').then(m => m.IronmanPageModule)
  },
  {
    path: 'thor',
    loadChildren: () => import('./paginasmarvel/thor/thor.module').then(m => m.ThorPageModule)
  },
  {
    path: 'blackwidow',
    loadChildren: () => import('./paginasmarvel/blackwidow/blackwidow.module').then(m => m.BlackwidowPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./carrito/carrito.module').then(m => m.CarritoPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  
  {
    path: 'recuperaclave',
    loadChildren: () => import('./recuperaclave/recuperaclave.module').then( m => m.RecuperaclavePageModule)
  },

  
  {
    path: 'modificarperfil',
    loadChildren: () => import('./modificarperfil/modificarperfil.module').then( m => m.ModificarperfilPageModule)
  },

  {
    path: 'modificarcontrasena',
    loadChildren: () => import('./modificarcontrasena/modificarcontrasena.module').then( m => m.ModificarContrasenaPageModule)

  },

  {
    path: '**',
    loadChildren: () => import('./notfound/notfound.module').then( m => m.NotfoundPageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
