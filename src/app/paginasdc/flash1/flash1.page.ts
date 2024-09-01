import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-flash1',
  templateUrl: './flash1.page.html',
  styleUrls: ['./flash1.page.scss'],
})
export class Flash1Page implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  // Definir la información del cómic específico
  comic = {
    title: 'The Flash',
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
