import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tokyorevengers',
  templateUrl: './tokyorevengers.page.html',
  styleUrls: ['./tokyorevengers.page.scss'],
})
export class TokyorevengersPage implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  constructor(private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async addToCart() {
    const alert = await this.alertCtrl.create({
      header: 'Añadido al Carro',
      message: `Has añadido ${this.quantity} de Tokyo Revengers al carrito.`,
      buttons: ['OK']
    });
    await alert.present();
  }
}
