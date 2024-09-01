import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ligadelajusticia1',
  templateUrl: './ligadelajusticia1.page.html',
  styleUrls: ['./ligadelajusticia1.page.scss'],
})
export class Ligadelajusticia1Page implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  constructor(private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async addToCart() {
    const alert = await this.alertCtrl.create({
      header: 'Añadido al Carro',
      message: `Has añadido ${this.quantity} de Liga de la Justicia al carrito.`,
      buttons: ['OK']
    });
    await alert.present();
  }
}
