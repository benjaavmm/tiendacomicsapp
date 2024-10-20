import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service'; // Asegúrate de que la ruta es correcta

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  comics = [
    {
      title: 'The Flash N°52',
      price: 21990,
      image: 'assets/img/flash.jpg',
      link: '/flash1',
      quantity: 1,
    },
    {
      title: 'Green Lantern: Tales of the Sinestro Corps',
      price: 19990,
      image: 'assets/img/linternaverde.jpg',
      link: '/linternaverde1',
      quantity: 1,
    },
    {
      title: 'Detective Comics #400: El Desafío del Hombre Murciélago',
      price: 23990,
      image: 'assets/img/batman1.jpg',
      link: '/batman1',
      quantity: 1,
    },
    {
      title: 'Dragon Ball #12: El Desafío de Goku y Vegeta',
      price: 13990,
      image: 'assets/img/dragonball.jpg',
      link: '/dragonball',
      quantity: 1,
    },
    {
      title: 'Demon Slayer',
      price: 11990,
      image: 'assets/img/demonslayer.jpg',
      link: '/demonslayer',
      quantity: 1,
    },
    {
      title: 'Batman Beyond',
      price: 21990,
      image: 'assets/img/batman2.jpg',
      link: '/batmanbeyond',
      quantity: 1,
    },
    {
      title: 'Naruto',
      price: 11990,
      image: 'assets/img/naruto.jpg',
      link: '/naruto',
      quantity: 1,
    },
    {
      title: 'The Amazing Spiderman',
      price: 18990,
      image: 'assets/img/spiderman.jpg',
      link: '/spiderman',
      quantity: 1,
    },
  ];

  filteredComics = [...this.comics];
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

  async addToCart(comic: any) {
    this.cartService.addToCart({ ...comic });
    const alert = await this.alertCtrl.create({
      header: 'Añadido al Carro',
      message: `Has añadido ${comic.quantity} de ${comic.title} al carrito.`,
      buttons: ['OK']
    });
    await alert.present();
  }

  increment(comic: any) {
    comic.quantity++;
  }

  decrement(comic: any) {
    if (comic.quantity > 1) {
      comic.quantity--;
    }
  }

  navigateToComic(comic: any) {
    this.router.navigate([comic.link]);
  }

  navigateToPage(link: string) {
    this.router.navigate([link]);
  }

  filterComics(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredComics = searchTerm ? this.comics.filter(comic => comic.title.toLowerCase().includes(searchTerm)) : [...this.comics];
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