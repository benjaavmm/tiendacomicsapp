import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CartService, Comic } from '../../services/cart.service';

@Component({
  selector: 'app-capitanamerica',
  templateUrl: './capitanamerica.page.html',
  styleUrls: ['./capitanamerica.page.scss'],
})
export class CapitanamericaPage implements OnInit {
  quantity: number = 1;

  comic: Comic = {
    id_comic: '12',
    nombre_comic: 'The Avengers: Captain America Lives Again!',
    precio: 22990,
    stock: 100,
    descripcion: '"The Avengers: Captain America Lives Again!" presenta el emocionante regreso del legendario Capitán América a las filas de los Vengadores. En esta historia épica, después de décadas de estar atrapado en un estado de animación suspendida, el Capitán América despierta en el mundo moderno para enfrentarse a una nueva era de desafíos.',
    foto_comic: 'assets/img/capitanamerica.jpg',
    id_categoria: 'marvel',
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

