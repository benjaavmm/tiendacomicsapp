import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-myheroacademia',
  templateUrl: './myheroacademia.page.html',
  styleUrls: ['./myheroacademia.page.scss'],
})
export class MyheroacademiaPage implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  constructor(private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async addToCart() {
    const alert = await this.alertCtrl.create({
      header: 'Añadido al Carro',
      message: `Has añadido ${this.quantity} de My Hero Academia al carrito.`,
      buttons: ['OK']
    });
    await alert.present();
  }
}
