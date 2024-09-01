import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-linternaverde1',
  templateUrl: './linternaverde1.page.html',
  styleUrls: ['./linternaverde1.page.scss'],
})
export class Linternaverde1Page implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  constructor(private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async addToCart() {
    const alert = await this.alertCtrl.create({
      header: 'Añadido al Carro',
      message: `Has añadido ${this.quantity} de Linterna Verde al carrito.`,
      buttons: ['OK']
    });
    await alert.present();
  }
}
