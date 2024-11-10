import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service'; // Asegúrate de que la ruta es correcta
import { Comic } from '../../services/comic'; // Asegúrate de que la ruta es correcta

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  comics: Comic[] = [
    // Cómic: The Flash N°52
    new Comic(
        '1', // ID único del cómic
        1, // Cantidad inicial en el carrito
        'The Flash N°52', // Nombre del cómic
        21990, // Precio del cómic
        10, // Cantidad disponible en stock
        'Descripción de The Flash', // Descripción del cómic
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
        10, // Cantidad disponible en stock
        'Descripción de Green Lantern', // Descripción del cómic
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
        10, // Cantidad disponible en stock
        'Descripción de Batman', // Descripción del cómic
        'assets/img/batman1.jpg', // Ruta de la imagen del cómic
        'dc', // Categoría del cómic
        '/batman1' // Enlace para navegación a la página del cómic
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

    // Cómic: Batman Beyond
    new Comic(
        '6', // ID único del cómic
        1, // Cantidad inicial en el carrito
        'Batman Beyond', // Nombre del cómic
        21990, // Precio del cómic
        10, // Cantidad disponible en stock
        'Descripción de Batman Beyond', // Descripción del cómic
        'assets/img/batman2.jpg', // Ruta de la imagen del cómic
        'dc', // Categoría del cómic
        '/batmanbeyond' // Enlace para navegación a la página del cómic
    ),

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

    // Cómic: The Amazing Spiderman
    new Comic(
        '8', // ID único del cómic
        1, // Cantidad inicial en el carrito
        'The Amazing Spiderman', // Nombre del cómic
        18990, // Precio del cómic
        10, // Cantidad disponible en stock
        'Descripción de Spiderman', // Descripción del cómic
        'assets/img/spiderman.jpg', // Ruta de la imagen del cómic
        'marvel', // Categoría del cómic
        '/spiderman' // Enlace para navegación a la página del cómic
    )
];


  filteredComics: Comic[] = [...this.comics];
  carouselImages = [
    { src: 'assets/img/marvel.png', link: '/comicsmarvel' },
    { src: 'assets/img/mangas.png', link: '/mangas' },
    { src: 'assets/img/supermancomic.jpg', link: '/comicsdc' }
  ];
  
  currentSlide = 0;
  slideInterval: any;

  constructor(private menu: MenuController, private alertCtrl: AlertController, private router: Router, private cartService: CartService) {}

  ngOnInit() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  openMenu() {
    this.menu.open('first');
  }

  async addToCart(comic: Comic) {
    this.cartService.addToCart({ ...comic });
    const alert = await this.alertCtrl.create({
      header: 'Añadido al Carro',
      message: `Has añadido ${comic.quantity} de ${comic.nombre_comic} al carrito.`,
      buttons: ['OK']
    });
    await alert.present();
  }

  increment(comic: Comic) {
    if (comic.quantity < comic.stock) { // Verifica que no exceda el stock
      comic.quantity++;
    }
  }

  decrement(comic: Comic) {
    if (comic.quantity > 1) {
      comic.quantity--;
    }
  }

  navigateToComic(comic: Comic) {
    this.router.navigate([comic.link]);
  }

  navigateToPage(link: string) {
    this.router.navigate([link]);
  }

  filterComics(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredComics = searchTerm ? this.comics.filter(comic => comic.nombre_comic.toLowerCase().includes(searchTerm)) : [...this.comics];
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.carouselImages.length;
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }
}
