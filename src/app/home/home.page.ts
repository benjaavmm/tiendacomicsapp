import { Component } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  comics = [
    {
      title: 'The Flash N°52',
      price: '$21.990',
      image: 'assets/img/flash.jpg',
      link: '/flash1',
      quantity: 1,  // Añadir esta propiedad
    },
    {
      title: 'Green Lantern: Tales of the Sinestro Corps',
      price: '$19.990',
      image: 'assets/img/linternaverde.jpg',
      link: '/linternaverde1',
      quantity: 1,  // Añadir esta propiedad
    },
    {
      title: 'Batman',
      price: '$23.990',
      image: 'assets/img/batman1.jpg',
      link: '/batman1',
      quantity: 1,  // Añadir esta propiedad
    },
    {
      title: 'Dragon Ball',
      price: '$13.990',
      image: 'assets/img/dragonball.jpg',
      link: '/dragonball',
      quantity: 1,  // Añadir esta propiedad
    },
    {
      title: 'Demon Slayer',
      price: '$11.990',
      image: 'assets/img/demonslayer.jpg',
      link: '/demonslayer',
      quantity: 1,  // Añadir esta propiedad
    },
    {
      title: 'Batman Beyond',
      price: '$21.990',
      image: 'assets/img/batman2.jpg',
      link: '/batmanbeyond',
      quantity: 1,  // Añadir esta propiedad
    },
    {
      title: 'Naruto',
      price: '$11.990',
      image: 'assets/img/naruto.jpg',
      link: '/naruto',
      quantity: 1,  // Añadir esta propiedad
    },
    {
      title: 'The Amazing Spiderman',
      price: '$18.990',
      image: 'assets/img/spiderman.jpg',
      link: '/spiderman',
      quantity: 1,  // Añadir esta propiedad
    },
  ];

  constructor(private menu: MenuController, private alertCtrl: AlertController) {}

  openMenu() {
    this.menu.open('first');
  }

  async addToCart(comic: any) {
    const alert = await this.alertCtrl.create({
      header: 'Añadido al Carro',
      message: `Has añadido ${comic.quantity} de ${comic.title} al carrito.`,
      buttons: ['OK']
    });
    await alert.present();
  }

  navigateToComic(comic: any) {
    window.location.href = comic.link;
  }
}
