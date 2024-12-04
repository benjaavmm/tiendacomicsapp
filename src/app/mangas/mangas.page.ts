import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Comic } from '../../services/comic';
import { ServicebdService } from '../../services/servicebd.service';

@Component({
  selector: 'app-mangas',
  templateUrl: './mangas.page.html',
  styleUrls: ['./mangas.page.scss'],
})
export class MangasPage implements OnInit, OnDestroy {
  comics: Comic[] = [
    // Cómic: Naruto
    {
      id_comic: 7,
      quantity: 1,
      nombre_comic: 'Naruto',
      precio: 11990,
      stock: 10,
      descripcion: 'Descripción de Naruto',
      foto_comic: 'assets/img/naruto.jpg',
      id_categoria: 2,
      link: '/naruto'
    },

    // Cómic: Demon Slayer
    {
      id_comic: 5,
      quantity: 1,
      nombre_comic: 'Demon Slayer',
      precio: 11990,
      stock: 10,
      descripcion: 'Descripción de Demon Slayer',
      foto_comic: 'assets/img/demonslayer.jpg',
      id_categoria: 2,
      link: '/demonslayer'
    },

    // Cómic: Dragon Ball #12
    {
      id_comic: 4,
      quantity: 1,
      nombre_comic: 'Dragon Ball #12: El Desafío de Goku y Vegeta',
      precio: 13990,
      stock: 10,
      descripcion: 'Descripción de Dragon Ball',
      foto_comic: 'assets/img/dragonball.jpg',
      id_categoria: 2,
      link: '/dragonball'
    },

    // Cómic: Jujutsu Kaisen
    {
      id_comic: 22,
      quantity: 1,
      nombre_comic: 'Jujutsu Kaisen',
      precio: 13990,
      stock: 10,
      descripcion: 'Descripción de Jujutsu Kaisen',
      foto_comic: 'assets/img/jujutsukaisen.jpg',
      id_categoria: 2,
      link: '/jujutsukaisen'
    },

    // Cómic: Tokyo Revengers
    {
      id_comic: 23,
      quantity: 1,
      nombre_comic: 'Tokyo Revengers',
      precio: 12990,
      stock: 10,
      descripcion: 'Descripción de Tokyo Revengers',
      foto_comic: 'assets/img/tokyorevengers.jpg',
      id_categoria: 2,
      link: '/tokyorevengers'
    },

    // Cómic: My Hero Academia
    {
      id_comic: 24,
      quantity: 1,
      nombre_comic: 'My Hero Academia',
      precio: 13990,
      stock: 10,
      descripcion: 'Descripción de My Hero Academia',
      foto_comic: 'assets/img/myheroacademia.jpg',
      id_categoria: 2,
      link: '/myheroacademia'
    },

    // Cómic: Attack On Titan
    {
      id_comic: 25, // Asegúrate de que este campo esté presente si es necesario
      nombre_comic: 'Attack On Titan',
      precio: 12990,
      stock: 10,
      descripcion: '"El Escuadrón de Reconocimiento planea una jugada arriesgada; que Eren, en forma de Titán, intente reparar la Muralla Rose, reclamando, por primera vez en un siglo, territorio para los humanos. Pero el control que tiene Eren como Titán dista mucho de ser perfecto y, cuando se descontrola, ¡ni siquiera Armin puede detenerlo! Con el peso de la supervivencia de la humanidad sobre sus enormes hombros, ¿podrá Eren recuperar la razón? ¿O se perderá para siempre?"',
      foto_comic: 'assets/img/atackontitan.jpg',
      id_categoria: 2,
      quantity: 0,
      link: '/attackontitan'
    },

    // Cómic: Hunter X Hunter
    {
      id_comic: 26,
      quantity: 1,
      nombre_comic: 'Hunter X Hunter',
      precio: 13990,
      stock: 10,
      descripcion: 'Descripción de Hunter X Hunter',
      foto_comic: 'assets/img/hxh.jpg',
      id_categoria: 2,
      link: '/hxh'
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
    this.filteredComics = this.comics.filter(comic => comic.stock > 0);
  }

  private async initializeComics() {
    try {
      await this.serviceBD.insertarComics(this.comics);
      const mangaComics = await this.serviceBD.getComicsByCategoria(2);
      this.comics = mangaComics;
    } catch (error) {
      console.error('Error al inicializar los mangas:', error);
    }
  }

  openMenu() {
    this.menu.open('first');
  }

  async addToCart(comic: Comic) {
    try {
      if (comic.stock <= 0) {
        const alert = await this.alertCtrl.create({
          header: 'No Disponible',
          message: 'Este cómic no está disponible actualmente.',
          buttons: ['OK']
        });
        await alert.present();
        return;
      }
  
      if (comic.quantity && comic.quantity <= comic.stock) {
        await this.cartService.addToCart(comic);
        const alert = await this.alertCtrl.create({
          header: 'Añadido al Carro',
          message: `Has añadido ${comic.quantity} de ${comic.nombre_comic} al carrito.`,
          buttons: ['OK']
        });
        await alert.present();
      } else {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: `Stock insuficiente. Stock disponible: ${comic.stock}`,
          buttons: ['OK']
        });
        await alert.present();
      }
    } catch (error: unknown) { // Especificar el tipo de error
      let errorMessage = 'Ocurrió un error inesperado.';
      if (error instanceof Error) {
        errorMessage = error.message; // Obtener el mensaje del error
      }
  
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: errorMessage,
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
    // Implementar lógica de limpieza si es necesario
  }
}