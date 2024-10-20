import { Component } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { CartService } from '../services/cart.service'; // Asegúrate de que la ruta sea correcta
import { Router } from '@angular/router';

@Component({
  selector: 'app-comicsdc',
  templateUrl: './comicsdc.page.html',
  styleUrls: ['./comicsdc.page.scss'],
})
export class ComicsdcPage {
  comics = [
    {
      title: 'The Flash N°52',
      price: '$21.990',
      image: 'assets/img/flash.jpg',
      link: '/flash1',
      quantity: 1
    },
    {
      title: 'Linterna Verde',
      price: '$19.990',
      image: 'assets/img/linternaverde.jpg',
      link: '/linternaverde1',
      quantity: 1
    },
    {
      title: 'Batman',
      price: '$23.990',
      image: 'assets/img/batman1.jpg',
      link: '/batman1',
      quantity: 1
    },
    {
      title: 'Aquaman #14: La Marea del Terror',
      price: '$18.890',
      image: 'assets/img/aquaman1.jpg',
      link: '/aquaman1',
      quantity: 1
    },
    {
      title: 'Liga de la Justicia #27: Legado',
      price: '$20.990',
      image: 'assets/img/ligadelajusticia1.jpg',
      link: '/ligadelajusticia1',
      quantity: 1
    },
    {
      title: 'Supergirl #3: El Reinado de los Superhombres Cibernéticos',
      price: '$17.000',
      image: 'assets/img/Supergirl.jpg',
      link: '/supergirl1',
      quantity: 1
    },
    {
      title: 'Superman #264: El Secreto del Mariscal de Campo Fantasma',
      price: '$18.800',
      image: 'assets/img/superman1.jpg',
      link: '/superman1',
      quantity: 1
    },
    {
      title: 'Jóvenes Titanes #1: El Reinado de los Superhombres Cibernéticos',
      price: '$19.900',
      image: 'assets/img/titans.png',
      link: '/titans1',
      quantity: 1
    }
  ];

  filteredComics = [...this.comics];  // inicializar con todos los cómics

  constructor(private menu: MenuController, private alertCtrl: AlertController, private cartService: CartService, private router: Router) {}

  openMenu() {
    this.menu.open('first');
  }

  async addToCart(comic: any) {
    this.cartService.addToCart({ ...comic });
    const alert = await this.alertCtrl.create({
      header: 'Añadido al Carro',
      message: `Has añadido ${comic.quantity} de ${comic.title} al carrito.`,
      buttons: ['OK']
    });
    await alert.present();
  }

  navigateToComic(link: string) {
    this.router.navigate([link]);
  }

  filterComics(event: any) {
    const searchTerm = event.target.value.toLowerCase();

    if (searchTerm && searchTerm.trim() !== '') {
      this.filteredComics = this.comics.filter((comic) => {
        return comic.title.toLowerCase().includes(searchTerm);
      });
    } else {
      this.filteredComics = [...this.comics];
    }
  }
}
