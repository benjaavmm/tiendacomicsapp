import { Component } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service'; // Asegúrate de que la ruta es correcta

@Component({
  selector: 'app-mangas',
  templateUrl: './mangas.page.html',
  styleUrls: ['./mangas.page.scss'],
})
export class MangasPage {
  comics = [
    {
      title: 'Naruto',
      price: 11990, 
      image: 'assets/img/naruto.jpg',
      link: '/naruto',
      quantity: 1
    },
    {
      title: 'Demon Slayer',
      price: 11990, 
      image: 'assets/img/demonslayer.jpg',
      link: '/demonslayer',
      quantity: 1
    },
    {
      title: 'Dragon Ball #12: El Desafío de Goku y Vegeta',
      price: 13990, 
      image: 'assets/img/dragonball.jpg',
      link: '/dragonball',
      quantity: 1
    },
    {
      title: 'Jujutsu Kaisen',
      price: 13990,
      image: 'assets/img/jujutsukaisen.jpg',
      link: '/jujutsukaisen',
      quantity: 1
    },
    {
      title: 'Tokyo Revengers',
      price: 12990, 
      image: 'assets/img/tokyorevengers.jpg',
      link: '/tokyorevengers',
      quantity: 1
    },
    {
      title: 'My Hero Academia',
      price: 13990, 
      image: 'assets/img/myheroacademia.jpg',
      link: '/myheroacademia',
      quantity: 1
    },
    {
      title: 'Attack On Titan',
      price: 12990, 
      image: 'assets/img/atackontitan.jpg',
      link: '/attackontitan',
      quantity: 1
    },
    {
      title: 'Hunter X Hunter',
      price: 13990, 
      image: 'assets/img/hxh.jpg',
      link: '/hxh',
      quantity: 1
    }
  ];
  

  filteredComics = [...this.comics];  // Inicializar con todos los cómics

  constructor(private menu: MenuController, private alertCtrl: AlertController, private router: Router, private cartService: CartService) {}

  openMenu() {
    this.menu.open('first');
  }

  async addToCart(comic: any) {
    // Agregar el cómic al carrito
    this.cartService.addToCart({ ...comic, quantity: comic.quantity });

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
