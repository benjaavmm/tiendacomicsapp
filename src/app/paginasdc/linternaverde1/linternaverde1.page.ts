import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';
import { Comic } from '../../../services/comic';

@Component({
  selector: 'app-linternaverde1',
  templateUrl: './linternaverde1.page.html',
  styleUrls: ['./linternaverde1.page.scss'],
})
export class Linternaverde1Page implements OnInit {
  quantity: number = 1;

  comic: Comic = {
    id_comic: 2,
    nombre_comic: 'Green Lantern: Tales of the Sinestro Corps',
    precio: 19990,
    stock: 10,
    descripcion: '"Linterna Verde: La Noche Más Oscura es una historia épica que explora los límites del poder y la voluntad."',
    foto_comic: 'assets/img/linternaverde.jpg',
    id_categoria: 3,
    quantity: 0,
    link: ''
  };

  constructor(private alertCtrl: AlertController, private cartService: CartService) { }

  ngOnInit() {}

  // Función para cambiar la cantidad
  changeQuantity(amount: number) {
    const newQuantity = this.quantity + amount;

    // Asegurarse de que la cantidad esté entre 1 y 10
    if (newQuantity >= 1 && newQuantity <= 10) {
      this.quantity = newQuantity;
    }
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
