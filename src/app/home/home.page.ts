import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Comic } from '../../services/comic';
import { ServicebdService } from '../../services/servicebd.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  comics: Comic[] = [
    // Cómic: The Flash N°52
    {
      id_comic: 1,
      quantity: 1,
      nombre_comic: 'The Flash N°52',
      precio: 21990,
      stock: 100,
      descripcion: 'Descripción del cómic',
      foto_comic: 'assets/img/flash.jpg',
      id_categoria: 3, // DC
      link: '/flash1'
    },

    // Cómic: Green Lantern: Tales of the Sinestro Corps
    {
      id_comic: 2,
      quantity: 1,
      nombre_comic: 'Green Lantern: Tales of the Sinestro Corps',
      precio: 19990,
      stock: 100,
      descripcion: 'Descripción del cómic',
      foto_comic: 'assets/img/linternaverde.jpg',
      id_categoria: 3, // DC
      link: '/linternaverde1'
    },

    // Cómic: Detective Comics #400
    {
      id_comic: 3,
      quantity: 1,
      nombre_comic: 'Detective Comics #400: El Desafío del Hombre Murciélago',
      precio: 23990,
      stock: 100,
      descripcion: 'Descripción del cómic',
      foto_comic: 'assets/img/batman1.jpg',
      id_categoria: 3, // DC
      link: '/batman1'
    },

    // Cómic: Dragon Ball #12
    {
      id_comic: 4,
      quantity: 1,
      nombre_comic: 'Dragon Ball #12: El Desafío de Goku y Vegeta',
      precio: 13990,
      stock: 100,
      descripcion: 'Descripción del cómic',
      foto_comic: 'assets/img/dragonball.jpg',
      id_categoria: 2, // Manga
      link: '/dragonball'
    },

    // Cómic: Demon Slayer
    {
      id_comic: 5,
      quantity: 1,
      nombre_comic: 'Demon Slayer',
      precio: 11990,
      stock: 100,
      descripcion: 'Descripción del cómic',
      foto_comic: 'assets/img/demonslayer.jpg',
      id_categoria: 2, // Manga
      link: '/demonslayer'
    },

    // Cómic: Marvel Super Heroes: Secret Wars
    {
      id_comic: 13,
      quantity: 1,
      nombre_comic: 'Marvel Super Heroes: Secret Wars',
      precio: 20990,
      stock: 100,
      descripcion: 'Descripción del cómic',
      foto_comic: 'assets/img/secretwars.jpg',
      id_categoria: 1, // Marvel
      link: '/secretwars'
    },

    // Cómic: Naruto
    {
      id_comic: 7,
      quantity: 1,
      nombre_comic: 'Naruto',
      precio: 11990,
      stock: 100,
      descripcion: 'Descripción del cómic',
      foto_comic: 'assets/img/naruto.jpg',
      id_categoria: 2, // Manga
      link: '/naruto'
    },

    // Cómic: The Amazing Spiderman
    {
      id_comic: 8,
      quantity: 1,
      nombre_comic: 'The Amazing Spiderman',
      precio: 18990,
      stock: 100,
      descripcion: 'Descripción del cómic',
      foto_comic: 'assets/img/spiderman.jpg',
      id_categoria: 1, // Marvel
      link: '/spiderman'
    }
  ];

  filteredComics: Comic[] = [];
  carouselImages = [
    { src: 'assets/img/marvel.png', link: '/comicsmarvel' },
    { src: 'assets/img/mangas.png', link: '/mangas' },
    { src: 'assets/img/supermancomic.jpg', link: '/comicsdc' }
  ];
  
  currentSlide = 0;
  slideInterval: any;

  constructor(
    private menu: MenuController,
    private alertCtrl: AlertController,
    private router: Router,
    private cartService: CartService,
    private serviceBD: ServicebdService
  ) {}

  async ngOnInit() {
    // Iniciar el carrusel
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 4000);

    // Inicializar los cómics desde la base de datos
    await this.initializeComics();
    this.filteredComics = [...this.comics];
  }

  private async initializeComics() {
    try {
      // Primero insertamos los cómics en la base de datos
      await this.serviceBD.insertarComics(this.comics);
      
      // Luego cargamos todos los cómics de todas las categorías
      const marvelComics = await this.serviceBD.getComicsByCategoria(1);
      const mangaComics = await this.serviceBD.getComicsByCategoria(2);
      const dcComics = await this.serviceBD.getComicsByCategoria(3);
      
      // Combinamos todos los cómics
      this.comics = [...marvelComics, ...mangaComics, ...dcComics];
    } catch (error) {
      console.error('Error al inicializar los cómics:', error);
    }
  }

  openMenu() {
    this.menu.open('first');
  }

  async addToCart(comic: Comic) {
    if (comic.quantity && comic.quantity <= comic.stock) {
      this.cartService.addToCart({ ...comic });
      const alert = await this.alertCtrl.create({
        header: 'Añadido al Carro',
        message: `Has añadido ${comic.quantity} de ${comic.nombre_comic} al carrito.`,
        buttons: ['OK']
      });
      await alert.present();
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'No hay suficiente stock disponible.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  increment(comic: Comic) {
    if (comic.quantity && comic.quantity < Math.min(10, comic.stock)) {
      comic.quantity++;
    }
  }

  decrement(comic: Comic) {
    if (comic.quantity && comic.quantity > 1) {
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
    
    if (searchTerm && searchTerm.trim() !== '') {
      this.filteredComics = this.comics.filter((comic) => {
        return comic.nombre_comic.toLowerCase().includes(searchTerm);
      });
    } else {
      this.filteredComics = [...this.comics];
    }
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