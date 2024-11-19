import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CartService, Comic } from '../../services/cart.service';

@Component({
  selector: 'app-ironman',
  templateUrl: './ironman.page.html',
  styleUrls: ['./ironman.page.scss'],
})
export class IronmanPage implements OnInit {
  quantity: number = 1;

  comic: Comic = {
    id_comic: '14',
    nombre_comic: 'The Invincible Iron Man: Cry Revolution!',
    precio: 24990,
    stock: 100,
    descripcion: '"The Invincible Iron Man: Cry Revolution!" narra la emocionante historia de Tony Stark, también conocido como Iron Man, mientras se enfrenta a una nueva amenaza que desafía su ingenio y su tecnología.',
    foto_comic: 'assets/img/ironman.jpg',
    id_categoria: 'marvel',
    quantity: 0,
    link: ''
  };

  constructor(private alertCtrl: AlertController, private cartService: CartService) { }

  ngOnInit() {}

  // Función para cambiar la cantidad
  changeQuantity(amount: number) {
    const newQuantity = this.quantity + amount;

    // Asegurarse de que la cantidad esté entre 1 y 10
    if (newQuantity >= 1 && newQuantity <= 10) {
      this.quantity = newQuantity;
    }
  }

  async addToCart() {
    this.cartService.addToCart({ ...this.comic, quantity: this.quantity });

    const alert = await this.alertCtrl.create({
      header: 'Añadido al Carro',
      message: `Has añadido ${this.quantity} de ${this.comic.nombre_comic} al carrito.`,
      buttons: ['OK']
    });
    await alert.present();
  }
}

