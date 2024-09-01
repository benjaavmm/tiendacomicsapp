import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-hulk',
  templateUrl: './hulk.page.html',
  styleUrls: ['./hulk.page.scss'],
})
export class HulkPage implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  constructor(private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async addToCart() {
    const alert = await this.alertCtrl.create({
      header: 'Añadido al Carro',
      message: `Has añadido ${this.quantity} de Hulk al carrito.`,
      buttons: ['OK']
    });
    await alert.present();
  }
}
