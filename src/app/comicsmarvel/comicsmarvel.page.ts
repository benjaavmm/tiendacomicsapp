import { Component } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { CartService } from '../services/cart.service'; 
import { Router } from '@angular/router';
import { Comic } from '../../services/comic'; 

@Component({
  selector: 'app-comicsmarvel',
  templateUrl: './comicsmarvel.page.html',
  styleUrls: ['./comicsmarvel.page.scss'],
})
export class ComicsmarvelPage {
  comics: Comic[] = [
    // Cómic: The Incredible Hulk And Now The Wolverine!
    new Comic(
        '9', // ID único del cómic
        1, // Cantidad inicial en el carrito
        'The Incredible Hulk And Now The Wolverine!', // Nombre del cómic
        22990, // Precio del cómic
        100, // Cantidad disponible en stock
        'Descripción del cómic', // Descripción del cómic
        'assets/img/hulk.png', // Ruta de la imagen del cómic
        'marvel', // Categoría del cómic
        '/hulk' // Enlace para navegación a la página del cómic
    ),

    // Cómic: The Amazing Spider-Man
    new Comic(
        '8', // ID único del cómic
        1, // Cantidad inicial en el carrito
        'The Amazing Spider-Man', // Nombre del cómic
        18990, // Precio del cómic
        100, // Cantidad disponible en stock
        'Descripción del cómic', // Descripción del cómic
        'assets/img/spiderman.jpg', // Ruta de la imagen del cómic
        'marvel', // Categoría del cómic
        '/spiderman' // Enlace para navegación a la página del cómic
    ),

    // Cómic: The Astonishing Ant-Man
    new Comic(
        '11', // ID único del cómic
        1, // Cantidad inicial en el carrito
        'The Astonishing Ant-Man', // Nombre del cómic
        23990, // Precio del cómic
        100, // Cantidad disponible en stock
        'Descripción del cómic', // Descripción del cómic
        'assets/img/antman.jpg', // Ruta de la imagen del cómic
        'marvel', // Categoría del cómic
        '/antman' // Enlace para navegación a la página del cómic
    ),

    // Cómic: The Avengers: Captain America Lives Again!
    new Comic(
        '12', // ID único del cómic
        1, // Cantidad inicial en el carrito
        'The Avengers: Captain America Lives Again!', // Nombre del cómic
        22990, // Precio del cómic
        100, // Cantidad disponible en stock
        'Descripción del cómic', // Descripción del cómic
        'assets/img/capitanamerica.jpg', // Ruta de la imagen del cómic
        'marvel', // Categoría del cómic
        '/capitanamerica' // Enlace para navegación a la página del cómic
    ),

    // Cómic: Marvel Super Heroes: Secret Wars
    new Comic(
        '13', // ID único del cómic
        1, // Cantidad inicial en el carrito
        'Marvel Super Heroes: Secret Wars', // Nombre del cómic
        20990, // Precio del cómic
        100, // Cantidad disponible en stock
        'Descripción del cómic', // Descripción del cómic
        'assets/img/secretwars.jpg', // Ruta de la imagen del cómic
        'marvel', // Categoría del cómic
        '/secretwars' // Enlace para navegación a la página del cómic
    ),

    // Cómic: The Invincible Iron Man: Cry Revolution!
    new Comic(
        '14', // ID único del cómic
        1, // Cantidad inicial en el carrito
        'The Invincible Iron Man: Cry Revolution!', // Nombre del cómic
        24990, // Precio del cómic
        100, // Cantidad disponible en stock
        'Descripción del cómic', // Descripción del cómic
        'assets/img/ironman.jpg', // Ruta de la imagen del cómic
        'marvel', // Categoría del cómic
        '/ironman' // Enlace para navegación a la página del cómic
    ),

    // Cómic: The Mighty Thor: The Wrath Of Odin!
    new Comic(
        '15', // ID único del cómic
        1, // Cantidad inicial en el carrito
        'The Mighty Thor: The Wrath Of Odin!', // Nombre del cómic
        21990, // Precio del cómic
        100, // Cantidad disponible en stock
        'Descripción del cómic', // Descripción del cómic
        'assets/img/thor.jpg', // Ruta de la imagen del cómic
        'marvel', // Categoría del cómic
        '/thor' // Enlace para navegación a la página del cómic
    ),

    // Cómic: Black Widow: Widow's Sting
    new Comic(
        '16', // ID único del cómic
        1, // Cantidad inicial en el carrito
        "Black Widow: Widow's Sting", // Nombre del cómic
        24990, // Precio del cómic
        100, // Cantidad disponible en stock
        'Descripción del cómic', // Descripción del cómic
        'assets/img/blackwidow.jpg', // Ruta de la imagen del cómic
        'marvel', // Categoría del cómic
        '/blackwidow' // Enlace para navegación a la página del cómic
    )
];

  
  filteredComics: Comic[] = [...this.comics];  // Inicializar con todos los cómics

  constructor(private menu: MenuController, private alertCtrl: AlertController, private cartService: CartService, private router: Router) {}

  openMenu() {
    this.menu.open('first');
  }

  async addToCart(comic: Comic) {
    // Agregar el cómic al carrito
    this.cartService.addToCart({ ...comic, quantity: comic.quantity });

    const alert = await this.alertCtrl.create({
      header: 'Añadido al Carro',
      message: `Has añadido ${comic.quantity} de ${comic.nombre_comic} al carrito.`,
      buttons: ['OK']
    });
    await alert.present();
  }

  increment(comic: Comic) {
    if (comic.quantity < 10) { // Asegura que la cantidad no sea mayor a 10
      comic.quantity++;  // Aumenta la cantidad del cómic
    }
  }

  decrement(comic: Comic) {
    if (comic.quantity > 1) { // Asegura que la cantidad no sea menor a 1
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
        return comic.nombre_comic.toLowerCase().includes(searchTerm);
      });
    } else {
      this.filteredComics = [...this.comics];
    }
  }
}
