import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-titans1',
  templateUrl: './titans1.page.html',
  styleUrls: ['./titans1.page.scss'],
})
export class Titans1Page implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  // Definir la información del cómic específico
  comic = {
    title: 'Teen Titans',
    quantity: this.quantity
  };

  constructor(private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async addToCart() {
    const alert = await this.alertCtrl.create({
      header: 'Añadido al Carro',
      message: `Has añadido ${this.comic.quantity} de ${this.comic.title} al carrito.`,
      buttons: ['OK']
    });
    await alert.present();
  }
}