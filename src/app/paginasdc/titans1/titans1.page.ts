import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CartService, Comic } from '../../services/cart.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-titans1',
  templateUrl: './titans1.page.html',
  styleUrls: ['./titans1.page.scss'],
})
export class Titans1Page implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  // Define el objeto Comic
  comic: Comic = {
    title: 'Jóvenes Titanes #1: El Reinado de los Superhombres Cibernéticos',
    price: 19900,
    image: 'assets/img/titans.png',
    quantity: 0 // Este valor se actualizará al añadir al carrito
  };

  constructor(private alertCtrl: AlertController, private cartService: CartService) { }

  ngOnInit() {
  }

  async addToCart() {
    // Añade el cómic al carrito
    this.cartService.addToCart({ ...this.comic, quantity: this.quantity });

    const alert = await this.alertCtrl.create({
      header: 'Añadido al Carro',
      message: `Has añadido ${this.quantity} de ${this.comic.title} al carrito.`,
      buttons: ['OK']
    });
    await alert.present();
  }
}
