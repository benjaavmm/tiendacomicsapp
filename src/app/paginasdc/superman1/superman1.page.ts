import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';
import { Comic } from '../../../services/comic';

@Component({
  selector: 'app-superman1',
  templateUrl: './superman1.page.html',
  styleUrls: ['./superman1.page.scss'],
})
export class Superman1Page implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  // Define el objeto Comic
  comic: Comic = {
    id_comic: 20, // Asegúrate de que este campo esté presente si es necesario
    nombre_comic: 'Superman #264: El Secreto del Mariscal de Campo Fantasma',
    precio: 18800,
    stock: 100, // Si necesitas un stock
    descripcion: '"En este emocionante número, Superman se enfrenta a un enemigo inusual: el Mariscal de Campo Fantasma. Este cómic promete acción, misterio y heroísmo mientras Superman se enfrenta a un desafío que va más allá de la fuerza física. ¡Prepárate para descubrir el secreto del Mariscal de Campo Fantasma en esta emocionante entrega!"',
    foto_comic: 'assets/img/superman1.jpg',
    id_categoria: 3,
    quantity: 0 // Este valor se actualizará al añadir al carrito
    ,
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
