import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { CartService } from '../services/cart.service'; 
import { Router } from '@angular/router';
import { Comic } from '../../services/comic'; 
import { ServicebdService } from '../../services/servicebd.service';

@Component({
  selector: 'app-comicsmarvel',
  templateUrl: './comicsmarvel.page.html',
  styleUrls: ['./comicsmarvel.page.scss'],
})
export class ComicsmarvelPage implements OnInit, OnDestroy {
  comics: Comic[] = [
    // Cómic: The Incredible Hulk And Now The Wolverine!
    {
      id_comic: 9,
      quantity: 1,
      nombre_comic: 'The Incredible Hulk And Now The Wolverine!',
      precio: 22990,
      stock: 100,
      descripcion: 'Descripción del cómic',
      foto_comic: 'assets/img/hulk.png',
      id_categoria: 1,
      link: '/hulk'
    },

    // Cómic: The Amazing Spider-Man
    {
      id_comic: 8,
      quantity: 1,
      nombre_comic: 'The Amazing Spider-Man',
      precio: 18990,
      stock: 100,
      descripcion: 'Descripción del cómic',
      foto_comic: 'assets/img/spiderman.jpg',
      id_categoria: 1,
      link: '/spiderman'
    },

    // Cómic: The Astonishing Ant-Man
    {
      id_comic: 11,
      quantity: 1,
      nombre_comic: 'The Astonishing Ant-Man',
      precio: 23990,
      stock: 100,
      descripcion: 'Descripción del cómic',
      foto_comic: 'assets/img/antman.jpg',
      id_categoria: 1,
      link: '/antman'
    },

    // Cómic: The Avengers: Captain America Lives Again!
    {
      id_comic: 12,
      quantity: 1,
      nombre_comic: 'The Avengers: Captain America Lives Again!',
      precio: 22990,
      stock: 100,
      descripcion: 'Descripción del cómic',
      foto_comic: 'assets/img/capitanamerica.jpg',
      id_categoria: 1,
      link: '/capitanamerica'
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
      id_categoria: 1,
      link: '/secretwars'
    },

    // Cómic: The Invincible Iron Man: Cry Revolution!
    {
      id_comic: 14,
      quantity: 1,
      nombre_comic: 'The Invincible Iron Man: Cry Revolution!',
      precio: 24990,
      stock: 100,
      descripcion: 'Descripción del cómic',
      foto_comic: 'assets/img/ironman.jpg',
      id_categoria: 1,
      link: '/ironman'
    },

    // Cómic: The Mighty Thor: The Wrath Of Odin!
    {
      id_comic: 15,
      quantity: 1,
      nombre_comic: 'The Mighty Thor: The Wrath Of Odin!',
      precio: 21990,
      stock: 100,
      descripcion: 'Descripción del cómic',
      foto_comic: 'assets/img/thor.jpg',
      id_categoria: 1,
      link: '/thor'
    },

    // Cómic: Black Widow: Widow's Sting
    {
      id_comic: 16,
      quantity: 1,
      nombre_comic: "Black Widow: Widow's Sting",
      precio: 24990,
      stock: 100,
      descripcion: 'Descripción del cómic',
      foto_comic: 'assets/img/blackwidow.jpg',
      id_categoria: 1,
      link: '/blackwidow'
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
      
      // Cargar solo los cómics de Marvel (categoría 1)
      const marvelComics = await this.serviceBD.getComicsByCategoria(1);
      this.comics = marvelComics;
    } catch (error) {
      console.error('Error al inicializar los cómics de Marvel:', error);
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
