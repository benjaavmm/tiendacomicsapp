import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';
import { Comic } from '../../../services/comic';

@Component({
  selector: 'app-flash1',
  templateUrl: './flash1.page.html',
  styleUrls: ['./flash1.page.scss'],
})
export class Flash1Page implements OnInit {
  quantity: number = 1;

  comic: Comic = {
    id_comic: 1,
    nombre_comic: 'The Flash N°52',
    precio: 21990,
    stock: 100,
    descripcion: '"El cómic de Flash sigue las aventuras de Barry Allen, un científico convertido en superhéroe después de ser alcanzado por un rayo."',
    foto_comic: 'assets/img/flash.jpg',
    id_categoria: 3,
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