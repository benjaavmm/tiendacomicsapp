import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-batman1',
  templateUrl: './batman1.page.html',
  styleUrls: ['./batman1.page.scss'],
})
export class Batman1Page {
  quantity: number = 1; // Define la cantidad inicial

  // Información del cómic específico
  comic = {
    title: 'Detective Comics #400: El Desafío del Hombre Murciélago',
    price: 23990,
    image: 'assets/img/batman1.jpg',
  };

  constructor(private alertCtrl: AlertController, private cartService: CartService) { }

  async addToCart() {
    // Agrega el cómic al carrito usando el servicio
    this.cartService.addToCart({ ...this.comic, quantity: this.quantity });
    
    // Muestra una alerta de confirmación
    const alert = await this.alertCtrl.create({
      header: 'Añadido al Carro',
      message: `Has añadido ${this.quantity} de ${this.comic.title} al carrito.`,
      buttons: ['OK']
    });
    await alert.present();
  }
}
