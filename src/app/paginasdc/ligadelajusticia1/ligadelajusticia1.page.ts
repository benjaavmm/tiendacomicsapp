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
  selector: 'app-ligadelajusticia1',
  templateUrl: './ligadelajusticia1.page.html',
  styleUrls: ['./ligadelajusticia1.page.scss'],
})
export class Ligadelajusticia1Page implements OnInit {
  quantity: number = 1;

  comic: Comic = { // Definición del comic
    title: 'Liga De La Justicia #27: Legado',
    price: 20890, 
    image: 'assets/img/ligadelajusticia1.jpg',
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
