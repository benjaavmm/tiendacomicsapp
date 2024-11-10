import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CartService, Comic } from '../../services/cart.service';

@Component({
  selector: 'app-secretwars',
  templateUrl: './secretwars.page.html',
  styleUrls: ['./secretwars.page.scss'],
})
export class SecretwarsPage implements OnInit {
  quantity: number = 1;

  comic: Comic = {
    id_comic: '13',
    nombre_comic: 'Marvel Super Heroes: Secret Wars',
    precio: 20990,
    stock: 100,
    descripcion: '"Marvel Super Heroes: Secret Wars es una saga épica que reúne a los héroes y villanos más emblemáticos del Universo Marvel en una batalla cósmica sin precedentes."',
    foto_comic: 'assets/img/secretwars.jpg',
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
