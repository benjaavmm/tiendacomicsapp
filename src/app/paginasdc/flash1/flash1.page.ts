import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-flash1',
  templateUrl: './flash1.page.html',
  styleUrls: ['./flash1.page.scss'],
})
export class Flash1Page implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  // Definir la información del cómic específico
  comic = {
    title: 'The Flash N°52',
    price: 21990,
    image: 'assets/img/flash.jpg',
  };

  constructor(private alertCtrl: AlertController, private cartService: CartService) { }

  ngOnInit() {
    // Aquí puedes agregar lógica adicional si es necesario
  }

  async addToCart() {
    this.cartService.addToCart({ ...this.comic, quantity: this.quantity });
    const alert = await this.alertCtrl.create({
      header: 'Añadido al Carro',
      message: `Has añadido ${this.quantity} de ${this.comic.title} al carrito.`,
      buttons: ['OK']
    });
    await alert.present();
  }
}
