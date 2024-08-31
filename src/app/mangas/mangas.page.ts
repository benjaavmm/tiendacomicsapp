import { Component } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-mangas',
  templateUrl: './mangas.page.html',
  styleUrls: ['./mangas.page.scss'],
})
export class MangasPage {
  comics = [
    {
      title: 'Naruto',
      price: '$11.990',
      image: 'assets/img/naruto.jpg',
      link: '/naruto',
      quantity: 1
    },
    {
      title: 'Demon Slayer',
      price: '$11.990',
      image: 'assets/img/demonslayer.jpg',
      link: '/demonslayer',
      quantity: 1
    },
    {
      title: 'Dragon Ball',
      price: '$13.990',
      image: 'assets/img/dragonball.jpg',
      link: '/dragonball',
      quantity: 1
    },
    {
      title: 'Jujutsu Kaisen',
      price: '$13.990',
      image: 'assets/img/jujutsukaisen.jpg',
      link: '/jujutsukaisen',
      quantity: 1
    },
    {
      title: 'Tokyo Revengers',
      price: '$12.990',
      image: 'assets/img/tokyorevengers.jpg',
      link: '/tokyorevengers',
      quantity: 1
    },
    {
      title: 'My Hero Academia',
      price: '$11.990',
      image: 'assets/img/myheroacademia.jpg',
      link: '/myheroacademia',
      quantity: 1
    },
    {
      title: 'Attack On Titan',
      price: '$12.990',
      image: 'assets/img/atackontitan.jpg',
      link: '/atackontitan',
      quantity: 1
    },
    {
      title: 'Hunter X Hunter',
      price: '$13.990',
      image: 'assets/img/hxh.jpg',
      link: '/hxh',
      quantity: 1
    }
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

  navigateToComic(title: string) {
    const selectedComic = this.comics.find(comic => comic.title === title);
    if (selectedComic) {
      window.location.href = selectedComic.link;
    }
  }
}
