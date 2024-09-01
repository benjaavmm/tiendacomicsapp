import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-attackontitan',
  templateUrl: './attackontitan.page.html',
  styleUrls: ['./attackontitan.page.scss'],
})
export class AttackontitanPage implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  constructor(private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async addToCart() {
    const alert = await this.alertCtrl.create({
      header: 'Añadido al Carro',
      message: `Has añadido ${this.quantity} de Attack on Titan al carrito.`,
      buttons: ['OK']
    });
    await alert.present();
  }
}
