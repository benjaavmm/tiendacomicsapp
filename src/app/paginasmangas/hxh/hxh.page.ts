import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-hxh',
  templateUrl: './hxh.page.html',
  styleUrls: ['./hxh.page.scss'],
})
export class HxhPage implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  constructor(private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async addToCart() {
    const alert = await this.alertCtrl.create({
      header: 'Añadido al Carro',
      message: `Has añadido ${this.quantity} de Hunter x Hunter al carrito.`,
      buttons: ['OK']
    });
    await alert.present();
  }
}
