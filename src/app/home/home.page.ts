import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  comics = [
    {
      title: 'The Flash N°52',
      price: '$21.990',
      image: 'assets/img/flash.jpg',
      link: '/flash1',
      quantity: 1,
    },
    {
      title: 'Green Lantern: Tales of the Sinestro Corps',
      price: '$19.990',
      image: 'assets/img/linternaverde.jpg',
      link: '/linternaverde1',
      quantity: 1,
    },
    {
      title: 'Batman',
      price: '$23.990',
      image: 'assets/img/batman1.jpg',
      link: '/batman1',
      quantity: 1,
    },
    {
      title: 'Dragon Ball',
      price: '$13.990',
      image: 'assets/img/dragonball.jpg',
      link: '/dragonball',
      quantity: 1,
    },
    {
      title: 'Demon Slayer',
      price: '$11.990',
      image: 'assets/img/demonslayer.jpg',
      link: '/demonslayer',
      quantity: 1,
    },
    {
      title: 'Batman Beyond',
      price: '$21.990',
      image: 'assets/img/batman2.jpg',
      link: '/batmanbeyond',
      quantity: 1,
    },
    {
      title: 'Naruto',
      price: '$11.990',
      image: 'assets/img/naruto.jpg',
      link: '/naruto',
      quantity: 1,
    },
    {
      title: 'The Amazing Spiderman',
      price: '$18.990',
      image: 'assets/img/spiderman.jpg',
      link: '/spiderman',
      quantity: 1,
    },
  ];

  filteredComics = [...this.comics];  // inicializar con todos los cómics

  carouselImages = [
    { src: 'assets/img/marvel.png', link: '/comicsmarvel' },
    { src: 'assets/img/mangas.png', link: '/mangas' },
    { src: 'assets/img/supermancomic.jpg', link: '/comicsdc' }
  ];
  
  navigateToPage(link: string) {
    window.location.href = link;
  }

  currentSlide = 0;
  slideInterval: any;

  constructor(private menu: MenuController, private alertCtrl: AlertController) {}

  ngOnInit() {
    // Iniciar el carrusel automático al cargar la página
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 4000);  // Cambia la imagen cada 2 segundos
  }

  openMenu() {
    this.menu.open('first');
  }

  async addToCart(comic: any) {
    const alert = await this.alertCtrl.create({
      header: 'Añadido al Carro',
      message: `Has añadido ${comic.quantity} de ${comic.title} al carrito.`,
      buttons: ['OK']
    });
    await alert.present();
  }
  

  increment(comic: any) {
    comic.quantity++;  // Aumenta la cantidad del cómic
  }

  decrement(comic: any) {
    if (comic.quantity > 1) { // Evita que la cantidad sea menor que 1
      comic.quantity--;  // Disminuye la cantidad del cómic
    }
  }


  navigateToComic(comic: any) {
    window.location.href = comic.link;
  }

  filterComics(event: any) {
    const searchTerm = event.target.value.toLowerCase();

    if (searchTerm && searchTerm.trim() !== '') {
      this.filteredComics = this.comics.filter((comic) => {
        return comic.title.toLowerCase().includes(searchTerm);
      });
    } else {
      this.filteredComics = [...this.comics];
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.carouselImages.length;
  }
  
  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.carouselImages.length) % this.carouselImages.length;
  }

  ngOnDestroy() {
    // Detener el carrusel automático cuando se destruya el componente
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }
}
