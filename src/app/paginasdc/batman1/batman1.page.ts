import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-batman1',
  templateUrl: './batman1.page.html',
  styleUrls: ['./batman1.page.scss'],
})
export class Batman1Page {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  // Definir la información del cómic específico
  comic = {
    title: 'Batman',
    quantity: this.quantity
  };

  constructor(private alertCtrl: AlertController) { }

  async addToCart() {
    // Lógica para agregar al carrito
    const alert = await this.alertCtrl.create({
      header: 'Añadido al Carro',
      message: `Has añadido ${this.comic.quantity} de ${this.comic.title} al carrito.`,
      buttons: ['OK']
    });
    await alert.present();
  }
}