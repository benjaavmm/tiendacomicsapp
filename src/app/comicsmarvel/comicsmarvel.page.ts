import { Component } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { CartService } from '../services/cart.service'; // Asegúrate de que la ruta sea correcta
import { Router } from '@angular/router';

@Component({
  selector: 'app-comicsmarvel',
  templateUrl: './comicsmarvel.page.html',
  styleUrls: ['./comicsmarvel.page.scss'],
})
export class ComicsmarvelPage {
  comics = [
    {
      title: 'The Incredible Hulk And Now The Wolverine!',
      price: 22990, 
      image: 'assets/img/hulk.png',
      link: '/hulk',
      quantity: 1
    },
    {
      title: 'The Amazing Spider-Man',
      price: 18990, 
      image: 'assets/img/spiderman.jpg',
      link: '/spiderman',
      quantity: 1
    },
    {
      title: 'The Astonishing Ant-Man',
      price: 23990, 
      image: 'assets/img/antman.jpg',
      link: '/antman',
      quantity: 1
    },
    {
      title: 'The Avengers: Captain America Lives Again!',
      price: 22990, 
      image: 'assets/img/capitanamerica.jpg',
      link: '/capitanamerica',
      quantity: 1
    },
    {
      title: 'Marvel Super Heroes: Secret Wars',
      price: 20990, 
      image: 'assets/img/secretwars.jpg',
      link: '/secretwars',
      quantity: 1
    },
    {
      title: 'The Invincible Iron Man: Cry Revolution!',
      price: 24990, 
      image: 'assets/img/ironman.jpg',
      link: '/ironman',
      quantity: 1
    },
    {
      title: 'The Mighty Thor: The Wrath Of Odin!',
      price: 21990, 
      image: 'assets/img/thor.jpg',
      link: '/thor',
      quantity: 1
    },
    {
      title: "Black Widow: Widow's Sting",
      price: 24990, 
      image: 'assets/img/blackwidow.jpg',
      link: '/blackwidow',
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

  increment(comic: any) {
    comic.quantity++;  // Aumenta la cantidad del cómic
  }

  decrement(comic: any) {
    if (comic.quantity > 1) { // Evita que la cantidad sea menor que 1
      comic.quantity--;  // Disminuye la cantidad del cómic
    }
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
