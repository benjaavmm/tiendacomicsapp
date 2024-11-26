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
    // Manga
    {
      id_comic: 7,
      quantity: 1,
      nombre_comic: 'Naruto',
      precio: 11990,
      stock: 10,
      descripcion: 'Manga de ninjas que narra la historia de Naruto Uzumaki',
      foto_comic: 'assets/img/naruto.jpg',
      id_categoria: 2,
      link: '/naruto'
    },
    // DC Comics
    {
      id_comic: 3,
      quantity: 1,
      nombre_comic: 'Batman: Detective Comics #400',
      precio: 23990,
      stock: 10,
      descripcion: 'El Caballero Oscuro se enfrenta a nuevos desafíos en Gotham',
      foto_comic: 'assets/img/batman1.jpg',
      id_categoria: 3,
      link: '/batman1'
    },
    // Marvel Comics
    {
      id_comic: 8,
      quantity: 1,
      nombre_comic: 'The Amazing Spider-Man',
      precio: 18990,
      stock: 10,
      descripcion: 'Las increíbles aventuras del Hombre Araña',
      foto_comic: 'assets/img/spiderman.jpg',
      id_categoria: 1,
      link: '/spiderman'
    },
    {
      id_comic: 16,
      quantity: 1,
      nombre_comic: 'Black Widow: Widow\'s Sting',
      precio: 24990,
      stock: 10,
      descripcion: 'Las misiones secretas de Natasha Romanoff',
      foto_comic: 'assets/img/blackwidow.jpg',
      id_categoria: 1,
      link: '/blackwidow'
    }
  ];

  filteredComics: Comic[] = [];
  featuredComics: Comic[] = [];
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
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 4000);

    await this.initializeComics();
    this.selectFeaturedComics();
  }

  private async initializeComics() {
    try {
      await this.serviceBD.insertarComics(this.comics);
      this.selectFeaturedComics();
    } catch (error) {
      console.error('Error al inicializar los cómics:', error);
      this.selectFeaturedComics();
    }
  }

  private selectFeaturedComics() {
    this.featuredComics = this.comics;
    this.filteredComics = this.featuredComics;
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
    if (comic.quantity < Math.min(10, comic.stock)) {
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
    
    if (searchTerm && searchTerm.trim() !== '') {
      this.filteredComics = this.featuredComics.filter((comic) => {
        return comic.nombre_comic.toLowerCase().includes(searchTerm);
      });
    } else {
      this.filteredComics = [...this.featuredComics];
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.carouselImages.length;
  }

  ngOnDestroy() {
    clearInterval(this.slideInterval);
  }
}
