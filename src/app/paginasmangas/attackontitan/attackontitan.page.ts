import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';
import { Comic } from '../../../services/comic';

@Component({
  selector: 'app-attackontitan',
  templateUrl: './attackontitan.page.html',
  styleUrls: ['./attackontitan.page.scss'],
})
export class AttackontitanPage implements OnInit {
  quantity: number = 1; // Cantidad inicial
  comic: Comic = {
    id_comic: 25,
    nombre_comic: 'Attack On Titan',
    precio: 12990,
    stock: 10,
    descripcion: '"El Escuadrón de Reconocimiento planea una jugada arriesgada; que Eren, en forma de Titán, intente reparar la Muralla Rose, reclamando, por primera vez en un siglo, territorio para los humanos. Pero el control que tiene Eren como Titán dista mucho de ser perfecto y, cuando se descontrola, ¡ni siquiera Armin puede detenerlo! Con el peso de la supervivencia de la humanidad sobre sus enormes hombros, ¿podrá Eren recuperar la razón? ¿O se perderá para siempre?"',
    foto_comic: 'assets/img/atackontitan.jpg',
    id_categoria: 2,
    quantity: 0,
    link: 'attackontitan'
  };

  constructor(private alertCtrl: AlertController, private cartService: CartService) {}

  ngOnInit() {}

  // Función para cambiar la cantidad
  changeQuantity(amount: number) {
    const newQuantity = this.quantity + amount;

    // Asegurarse de que la cantidad esté entre 1 y el stock disponible
    if (newQuantity >= 1 && newQuantity <= this.comic.stock) {
      this.quantity = newQuantity;
    }
  }

  async addToCart() {
    if (this.quantity > this.comic.stock) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: `Stock insuficiente. Stock disponible: ${this.comic.stock}`,
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    this.cartService.addToCart({ ...this.comic, quantity: this.quantity });

    const alert = await this.alertCtrl.create({
      header: 'Añadido al Carro',
      message: `Has añadido ${this.quantity} de ${this.comic.nombre_comic} al carrito.`,
      buttons: ['OK']
    });
    await alert.present();
  }
}
