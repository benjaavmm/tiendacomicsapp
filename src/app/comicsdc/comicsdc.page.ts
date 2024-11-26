import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { Comic } from '../../services/comic';
import { ServicebdService } from '../../services/servicebd.service';

@Component({
  selector: 'app-comicsdc',
  templateUrl: './comicsdc.page.html',
  styleUrls: ['./comicsdc.page.scss'],
})
export class ComicsdcPage implements OnInit, OnDestroy {
  comics: Comic[] = [
    // Cómic: The Flash N°52
    {
      id_comic: 1,
      quantity: 1,
      nombre_comic: 'The Flash N°52',
      precio: 21990,
      stock: 10,
      descripcion: 'Descripción del cómic',
      foto_comic: 'assets/img/flash.jpg',
      id_categoria: 3,
      link: '/flash1'
    },

    // Cómic: Green Lantern: Tales of the Sinestro Corps
    {
      id_comic: 2,
      quantity: 1,
      nombre_comic: 'Green Lantern: Tales of the Sinestro Corps',
      precio: 19990,
      stock: 10,
      descripcion: 'Descripción del cómic',
      foto_comic: 'assets/img/linternaverde.jpg',
      id_categoria: 3,
      link: '/linternaverde1'
    },

    // Cómic: Detective Comics #400
    {
      id_comic: 3,
      quantity: 1,
      nombre_comic: 'Detective Comics #400: El Desafío del Hombre Murciélago',
      precio: 23990,
      stock: 10,
      descripcion: 'Descripción del cómic',
      foto_comic: 'assets/img/batman1.jpg',
      id_categoria: 3,
      link: '/batman1'
    },

    // Cómic: Aquaman #14
    {
      id_comic: 17,
      quantity: 1,
      nombre_comic: 'Aquaman #14: La Marea del Terror',
      precio: 18890,
      stock: 10,
      descripcion: 'Descripción del cómic',
      foto_comic: 'assets/img/aquaman1.jpg',
      id_categoria: 3,
      link: '/aquaman1'
    },

    // Cómic: Liga De La Justicia #27
    {
      id_comic: 18,
      quantity: 1,
      nombre_comic: 'Liga De La Justicia #27: Legado',
      precio: 20890,
      stock: 10,
      descripcion: 'Descripción del cómic',
      foto_comic: 'assets/img/ligadelajusticia1.jpg',
      id_categoria: 3,
      link: '/ligadelajusticia1'
    },

    // Cómic: Supergirl #3
    {
      id_comic: 19,
      quantity: 1,
      nombre_comic: 'Supergirl #3: El Reinado de los Superhombres Cibernéticos',
      precio: 17000,
      stock: 10,
      descripcion: 'Descripción del cómic',
      foto_comic: 'assets/img/Supergirl.jpg',
      id_categoria: 3,
      link: '/supergirl1'
    },

    // Cómic: Superman #264
    {
      id_comic: 20,
      quantity: 1,
      nombre_comic: 'Superman #264: El Secreto del Mariscal de Campo Fantasma',
      precio: 18800,
      stock: 10,
      descripcion: 'Descripción del cómic',
      foto_comic: 'assets/img/superman1.jpg',
      id_categoria: 3,
      link: '/superman1'
    },

    // Cómic: Jóvenes Titanes #1
    {
      id_comic: 21,
      quantity: 1,
      nombre_comic: 'Jóvenes Titanes #1: El Reinado de los Superhombres Cibernéticos',
      precio: 19900,
      stock: 10,
      descripcion: 'Descripción del cómic',
      foto_comic: 'assets/img/titans.png',
      id_categoria: 3,
      link: '/titans1'
    }
  ];

  filteredComics: Comic[] = [];

  constructor(
    private menu: MenuController,
    private alertCtrl: AlertController,
    private cartService: CartService,
    private router: Router,
    private serviceBD: ServicebdService
  ) {}

  async ngOnInit() {
    await this.initializeComics();
    this.filteredComics = [...this.comics];
  }

  private async initializeComics() {
    try {
      // Insertar los cómics en la base de datos
      await this.serviceBD.insertarComics(this.comics);
      
      // Cargar solo los cómics de DC (categoría 3)
      const dcComics = await this.serviceBD.getComicsByCategoria(3);
      this.comics = dcComics;
    } catch (error) {
      console.error('Error al inicializar los cómics de DC:', error);
    }
  }

  openMenu() {
    this.menu.open('first');
  }

  async addToCart(comic: Comic) {
    if (comic.quantity && comic.quantity <= comic.stock) {
      const comicToAdd = { ...comic };
      this.cartService.addToCart(comicToAdd);

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

  navigateToComic(link: string) {
    this.router.navigate([link]);
  }

  filterComics(event: any) {
    const searchTerm = event?.target?.value?.toLowerCase() || '';

    if (searchTerm.trim() !== '') {
      this.filteredComics = this.comics.filter((comic) =>
        comic.nombre_comic.toLowerCase().includes(searchTerm)
      );
    } else {
      this.filteredComics = [...this.comics];
    }
  }

  ngOnDestroy() {
    
  }
}
