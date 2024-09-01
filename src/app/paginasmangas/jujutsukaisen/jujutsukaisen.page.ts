import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-jujutsukaisen',
  templateUrl: './jujutsukaisen.page.html',
  styleUrls: ['./jujutsukaisen.page.scss'],
})
export class JujutsukaisenPage implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  constructor(private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async addToCart() {
    const alert = await this.alertCtrl.create({
      header: 'Añadido al Carro',
      message: `Has añadido ${this.quantity} de Jujutsu Kaisen al carrito.`,
      buttons: ['OK']
    });
    await alert.present();
  }
}
