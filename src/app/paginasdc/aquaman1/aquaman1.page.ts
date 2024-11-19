import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CartService, Comic } from '../../services/cart.service';

@Component({
  selector: 'app-aquaman1',
  templateUrl: './aquaman1.page.html',
  styleUrls: ['./aquaman1.page.scss'],
})
export class Aquaman1Page implements OnInit {
  quantity: number = 1;

  comic: Comic = {
    id_comic: '17',
    nombre_comic: 'Aquaman #14: La Marea del Terror',
    precio: 18890,
    stock: 10,
    descripcion: '"En las profundidades de los océanos de la Tierra, Aquaman se enfrenta a una nueva ola de terror en el número 14 de su serie."',
    foto_comic: 'assets/img/aquaman1.jpg',
    id_categoria: 'dc',
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
