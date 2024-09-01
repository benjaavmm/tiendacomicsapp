import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-supergirl1',
  templateUrl: './supergirl1.page.html',
  styleUrls: ['./supergirl1.page.scss'],
})
export class Supergirl1Page implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  constructor(private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async addToCart() {
    const alert = await this.alertCtrl.create({
      header: 'Añadido al Carro',
      message: `Has añadido ${this.quantity} de Supergirl al carrito.`,
      buttons: ['OK']
    });
    await alert.present();
  }
}
