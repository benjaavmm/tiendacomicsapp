import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';
import { Comic } from '../../../services/comic';

@Component({
  selector: 'app-hulk',
  templateUrl: './hulk.page.html',
  styleUrls: ['./hulk.page.scss'],
})
export class HulkPage implements OnInit {
  quantity: number = 1;

  comic: Comic = {
    id_comic: 9,
    nombre_comic: 'The Incredible Hulk And Now The Wolverine!',
    precio: 22990,
    stock: 10,
    descripcion: '"The Incredible Hulk and Now the Wolverine es un cómic que presenta un emocionante crossover entre dos de los héroes más icónicos de Marvel Comics: Hulk y Wolverine. En esta historia épica, los lectores son testigos de un enfrentamiento titánico entre la increíble fuerza de Hulk y la ferocidad y habilidades regenerativas de Wolverine."',
    foto_comic: 'assets/img/hulk.png',
    id_categoria: 1,
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


