import { Component } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service'; // Asegúrate de que la ruta es correcta
import { Comic } from '../../services/comic'; // Asegúrate de que la ruta es correcta

@Component({
  selector: 'app-mangas',
  templateUrl: './mangas.page.html',
  styleUrls: ['./mangas.page.scss'],
})
export class MangasPage {
  comics: Comic[] = [
    // Cómic: Naruto
    new Comic(
        '7', // ID único del cómic
        1, // Cantidad inicial en el carrito
        'Naruto', // Nombre del cómic
        11990, // Precio del cómic
        10, // Cantidad disponible en stock
        'Descripción de Naruto', // Descripción del cómic
        'assets/img/naruto.jpg', // Ruta de la imagen del cómic
        'mangas', // Categoría del cómic
        '/naruto' // Enlace para navegación a la página del cómic
    ),

    // Cómic: Demon Slayer
    new Comic(
        '5', // ID único del cómic
        1, // Cantidad inicial en el carrito
        'Demon Slayer', // Nombre del cómic
        11990, // Precio del cómic
        10, // Cantidad disponible en stock
        'Descripción de Demon Slayer', // Descripción del cómic
        'assets/img/demonslayer.jpg', // Ruta de la imagen del cómic
        'mangas', // Categoría del cómic
        '/demonslayer' // Enlace para navegación a la página del cómic
    ),

    // Cómic: Dragon Ball #12: El Desafío de Goku y Vegeta
    new Comic(
        '4', // ID único del cómic
        1, // Cantidad inicial en el carrito
        'Dragon Ball #12: El Desafío de Goku y Vegeta', // Nombre del cómic
        13990, // Precio del cómic
        10, // Cantidad disponible en stock
        'Descripción de Dragon Ball', // Descripción del cómic
        'assets/img/dragonball.jpg', // Ruta de la imagen del cómic
        'mangas', // Categoría del cómic
        '/dragonball' // Enlace para navegación a la página del cómic
    ),

    // Cómic: Jujutsu Kaisen
    new Comic(
        '22', // ID único del cómic
        1, // Cantidad inicial en el carrito
        'Jujutsu Kaisen', // Nombre del cómic
        13990, // Precio del cómic
        10, // Cantidad disponible en stock
        'Descripción de Jujutsu Kaisen', // Descripción del cómic
        'assets/img/jujutsukaisen.jpg', // Ruta de la imagen del cómic
        'mangas', // Categoría del cómic
        '/jujutsukaisen' // Enlace para navegación a la página del cómic
    ),

    // Cómic: Tokyo Revengers
    new Comic(
        '23', // ID único del cómic
        1, // Cantidad inicial en el carrito
        'Tokyo Revengers', // Nombre del cómic
        12990, // Precio del cómic
        10, // Cantidad disponible en stock
        'Descripción de Tokyo Revengers', // Descripción del cómic
        'assets/img/tokyorevengers.jpg', // Ruta de la imagen del cómic
        'mangas', // Categoría del cómic
        '/tokyorevengers' // Enlace para navegación a la página del cómic
    ),

    // Cómic: My Hero Academia
    new Comic(
        '24', // ID único del cómic
        1, // Cantidad inicial en el carrito
        'My Hero Academia', // Nombre del cómic
        13990, // Precio del cómic
        10, // Cantidad disponible en stock
        'Descripción de My Hero Academia', // Descripción del cómic
        'assets/img/myheroacademia.jpg', // Ruta de la imagen del cómic
        'mangas', // Categoría del cómic
        '/myheroacademia' // Enlace para navegación a la página del cómic
    ),

    // Cómic: Attack On Titan
    new Comic(
        '25', // ID único del cómic
        1, // Cantidad inicial en el carrito
        'Attack On Titan', // Nombre del cómic
        12990, // Precio del cómic
        10, // Cantidad disponible en stock
        'Descripción de Attack On Titan', // Descripción del cómic
        'assets/img/atackontitan.jpg', // Ruta de la imagen del cómic
        'mangas', // Categoría del cómic
        '/attackontitan' // Enlace para navegación a la página del cómic
    ),

    // Cómic: Hunter X Hunter
    new Comic(
        '26', // ID único del cómic
        1, // Cantidad inicial en el carrito
        'Hunter X Hunter', // Nombre del cómic
        13990, // Precio del cómic
        10, // Cantidad disponible en stock
        'Descripción de Hunter X Hunter', // Descripción del cómic
        'assets/img/hxh.jpg', // Ruta de la imagen del cómic
        'mangas', // Categoría del cómic
        '/hxh' // Enlace para navegación a la página del cómic
    )
];
  
  filteredComics = [...this.comics];  // Inicializar con todos los cómics

  constructor(private menu: MenuController, private alertCtrl: AlertController, private router: Router, private cartService: CartService) {}

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
    comic.quantity++;  // Aumenta la cantidad del cómic
  }

  decrement(comic: Comic) {
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
        return comic.nombre_comic.toLowerCase().includes(searchTerm);
      });
    } else {
      this.filteredComics = [...this.comics];
    }
  }
}
