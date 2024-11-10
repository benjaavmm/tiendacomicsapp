import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CartService, Comic } from '../../services/cart.service';

@Component({
  selector: 'app-antman',
  templateUrl: './antman.page.html',
  styleUrls: ['./antman.page.scss'],
})
export class AntmanPage implements OnInit {
  quantity: number = 1;

  comic: Comic = {
    id_comic: '11',
    nombre_comic: 'The Astonishing Ant-Man',
    precio: 23990,
    stock: 100,
    descripcion: 'The Astonishing Ant-Man sigue las aventuras de Scott Lang, un exconvicto y experto en tecnología que asume el papel del héroe diminuto, Ant-Man. Con un traje que le permite encogerse hasta el tamaño de una hormiga y aumentar su fuerza, Scott enfrenta desafíos tanto dentro como fuera del traje mientras equilibra su vida como padre soltero y superhéroe.',
    foto_comic: 'assets/img/antman.jpg',
    id_categoria: 'marvel',
    quantity: 0,
    link: ''
  };

  constructor(private alertCtrl: AlertController, private cartService: CartService) { }

  ngOnInit() {
  }

  async addToCart() {
    this.cartService.addToCart({ ...this.comic, quantity: this.quantity });

    const alert = await this.alertCtrl.create({
      header: 'Añadido al Carro',
      message: `Has añadido ${this.quantity} de ${this.comic.nombre_comic} al carrito.`,
      buttons: ['OK']
    });
    await alert.present();
  }
}
