import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';

interface Comic { // Asegúrate de que esta interfaz esté definida correctamente
  title: string;
  price: number; // Asegúrate de que sea un número
  image: string;
  quantity: number;
}

@Component({
  selector: 'app-aquaman1',
  templateUrl: './aquaman1.page.html',
  styleUrls: ['./aquaman1.page.scss'],
})
export class Aquaman1Page implements OnInit {
  quantity: number = 1;

  comic: Comic = { // Definición del comic
    title: 'Aquaman #14: La Marea del Terror',
    price: 18890, // Asegúrate de que sea un número
    image: 'assets/img/aquaman1.jpg',
    quantity: this.quantity
  };

  constructor(private alertCtrl: AlertController, private cartService: CartService) { }

  ngOnInit() {
    // Aquí puedes agregar lógica adicional si es necesario
  }

  async addToCart() {
    this.cartService.addToCart({ ...this.comic, quantity: this.quantity });
    
    const alert = await this.alertCtrl.create({
      header: 'Añadido al Carro',
      message: `Has añadido ${this.quantity} de ${this.comic.title} al carrito.`,
      buttons: ['OK']
    });
    await alert.present();
  }
}
