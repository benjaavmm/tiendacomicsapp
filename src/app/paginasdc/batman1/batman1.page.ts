import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';
import { Comic } from '../../../services/comic';

@Component({
  selector: 'app-batman1',
  templateUrl: './batman1.page.html',
  styleUrls: ['./batman1.page.scss'],
})
export class Batman1Page implements OnInit {
  quantity: number = 1;

  comic: Comic = {
    id_comic: 3,
    nombre_comic: 'Detective Comics #400: El Desafío del Hombre Murciélago',
    precio: 23990,
    stock: 100,
    descripcion: '"En esta edición histórica, sumérgete en la oscuridad de Gotham City con Batman enfrentando una de las amenazas más inusuales: el Hombre Murciélago."',
    foto_comic: 'assets/img/batman1.jpg',
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