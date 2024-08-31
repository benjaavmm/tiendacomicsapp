import { Component } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-comicsmarvel',
  templateUrl: './comicsmarvel.page.html',
  styleUrls: ['./comicsmarvel.page.scss'],
})
export class ComicsmarvelPage {
  comics = [
    {
      title: 'The Incredible Hulk And Now The Wolverine!',
      price: '$22.990',
      image: 'assets/img/hulk.png',
      link: '/hulk1',
      quantity: 1
    },
    {
      title: 'The Amazing Spider-Man',
      price: '$18.990',
      image: 'assets/img/spiderman.jpg',
      link: '/spiderman1',
      quantity: 1
    },
    {
      title: 'The Astonishing Ant-Man',
      price: '$23.990',
      image: 'assets/img/antman.jpg',
      link: '/antman1',
      quantity: 1
    },
    {
      title: 'The Avengers: Captain America Lives Again!',
      price: '$22.990',
      image: 'assets/img/capitanamerica.jpg',
      link: '/capitanamerica1',
      quantity: 1
    },
    {
      title: 'Marvel Super Heroes: Secret Wars',
      price: '$20.990',
      image: 'assets/img/secretwars.jpg',
      link: '/secretwars1',
      quantity: 1
    },
    {
      title: 'The Invincible Iron Man: Cry Revolution!',
      price: '$24.990',
      image: 'assets/img/ironman.jpg',
      link: '/ironman1',
      quantity: 1
    },
    {
      title: 'The Mighty Thor: The Wrath Of Odin!',
      price: '$21.990',
      image: 'assets/img/thor.jpg',
      link: '/thor1',
      quantity: 1
    },
    {
      title: "Black Widow: Widow's Sting",
      price: '$24.990',
      image: 'assets/img/blackwidow.jpg',
      link: '/blackwidow1',
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

  navigateToComic(link: string) {
    window.location.href = link;
  }
}
