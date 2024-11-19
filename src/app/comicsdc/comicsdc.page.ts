import { Component } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { CartService } from '../services/cart.service'; // Asegúrate de que la ruta sea correcta
import { Router } from '@angular/router';
import { Comic } from '../../services/comic'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-comicsdc',
  templateUrl: './comicsdc.page.html',
  styleUrls: ['./comicsdc.page.scss'],
})
export class ComicsdcPage {
  comics: Comic[] = [
    // Cómic: The Flash N°52
    new Comic(
      '1', // ID único del cómic
      1, // Cantidad inicial en el carrito
      'The Flash N°52', // Nombre del cómic
      21990, // Precio del cómic
      100, // Cantidad disponible en stock
      'Descripción del cómic', // Descripción del cómic
      'assets/img/flash.jpg', // Ruta de la imagen del cómic
      'dc', // Categoría del cómic
      '/flash1' // Enlace para navegación a la página del cómic
    ),

    // Cómic: Green Lantern: Tales of the Sinestro Corps
    new Comic(
      '2', // ID único del cómic
      1, // Cantidad inicial en el carrito
      'Green Lantern: Tales of the Sinestro Corps', // Nombre del cómic
      19990, // Precio del cómic
      100, // Cantidad disponible en stock
      'Descripción del cómic', // Descripción del cómic
      'assets/img/linternaverde.jpg', // Ruta de la imagen del cómic
      'dc', // Categoría del cómic
      '/linternaverde1' // Enlace para navegación a la página del cómic
    ),

    // Cómic: Detective Comics #400: El Desafío del Hombre Murciélago
    new Comic(
      '3', // ID único del cómic
      1, // Cantidad inicial en el carrito
      'Detective Comics #400: El Desafío del Hombre Murciélago', // Nombre del cómic
      23990, // Precio del cómic
      100, // Cantidad disponible en stock
      'Descripción del cómic', // Descripción del cómic
      'assets/img/batman1.jpg', // Ruta de la imagen del cómic
      'dc', // Categoría del cómic
      '/batman1' // Enlace para navegación a la página del cómic
    ),

    // Cómic: Aquaman #14: La Marea del Terror
    new Comic(
      '17', // ID único del cómic
      1, // Cantidad inicial en el carrito
      'Aquaman #14: La Marea del Terror', // Nombre del cómic
      18890, // Precio del cómic
      100, // Cantidad disponible en stock
      'Descripción del cómic', // Descripción del cómic
      'assets/img/aquaman1.jpg', // Ruta de la imagen del cómic
      'dc', // Categoría del cómic
      '/aquaman1' // Enlace para navegación a la página del cómic
    ),

    // Cómic: Liga De La Justicia #27: Legado
    new Comic(
      '18', // ID único del cómic
      1, // Cantidad inicial en el carrito
      'Liga De La Justicia #27: Legado', // Nombre del cómic
      20890, // Precio del cómic
      100, // Cantidad disponible en stock
      'Descripción del cómic', // Descripción del cómic
      'assets/img/ligadelajusticia1.jpg', // Ruta de la imagen del cómic
      'dc', // Categoría del cómic
      '/ligadelajusticia1' // Enlace para navegación a la página del cómic
    ),

    // Cómic: Supergirl #3: El Reinado de los Superhombres Cibernéticos
    new Comic(
      '19', // ID único del cómic
      1, // Cantidad inicial en el carrito
      'Supergirl #3: El Reinado de los Superhombres Cibernéticos', // Nombre del cómic
      17000, // Precio del cómic
      100, // Cantidad disponible en stock
      'Descripción del cómic', // Descripción del cómic
      'assets/img/Supergirl.jpg', // Ruta de la imagen del cómic
      'dc', // Categoría del cómic
      '/supergirl1' // Enlace para navegación a la página del cómic
    ),

    // Cómic: Superman #264: El Secreto del Mariscal de Campo Fantasma
    new Comic(
      '20', // ID único del cómic
      1, // Cantidad inicial en el carrito
      'Superman #264: El Secreto del Mariscal de Campo Fantasma', // Nombre del cómic
      18800, // Precio del cómic
      100, // Cantidad disponible en stock
      'Descripción del cómic', // Descripción del cómic
      'assets/img/superman1.jpg', // Ruta de la imagen del cómic
      'dc', // Categoría del cómic
      '/superman1' // Enlace para navegación a la página del cómic
    ),

    // Cómic: Jóvenes Titanes #1: El Reinado de los Superhombres Cibernéticos
    new Comic(
      '21', // ID único del cómic
      1, // Cantidad inicial en el carrito
      'Jóvenes Titanes #1: El Reinado de los Superhombres Cibernéticos', // Nombre del cómic
      19900, // Precio del cómic
      100, // Cantidad disponible en stock
      'Descripción del cómic', // Descripción del cómic
      'assets/img/titans.png', // Ruta de la imagen del cómic
      'dc', // Categoría del cómic
      '/titans1' // Enlace para navegación a la página del cómic
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
