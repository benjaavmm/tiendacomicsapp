import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';
import { Comic } from '../../../services/comic';

@Component({
  selector: 'app-blackwidow',
  templateUrl: './blackwidow.page.html',
  styleUrls: ['./blackwidow.page.scss'],
})
export class BlackwidowPage implements OnInit {
  quantity: number = 1;

  comic: Comic = {
    id_comic: 16,
    nombre_comic: 'Black Widow: Widow\'s Sting',
    precio: 24990,
    stock: 10,
    descripcion: '"Black Widow: Widow\'s Sting" sigue los pasos de Natasha Romanoff, también conocida como la Viuda Negra, en una emocionante misión llena de intriga y peligro. Cuando un antiguo enemigo resurge con un plan para desatar el caos mundial, Natasha se ve obligada a enfrentar su pasado oscuro mientras lucha por detener una conspiración que amenaza con destruir todo lo que ama.',
    foto_comic: 'assets/img/blackwidow.jpg',
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

