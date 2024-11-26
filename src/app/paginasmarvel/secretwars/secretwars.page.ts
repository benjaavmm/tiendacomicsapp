import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';
import { Comic } from '../../../services/comic';
@Component({
  selector: 'app-secretwars',
  templateUrl: './secretwars.page.html',
  styleUrls: ['./secretwars.page.scss'],
})
export class SecretwarsPage implements OnInit {
  quantity: number = 1;

  comic: Comic = {
    id_comic: 13,
    nombre_comic: 'Marvel Super Heroes: Secret Wars',
    precio: 20990,
    stock: 10,
    descripcion: '"Marvel Super Heroes: Secret Wars es una saga épica que reúne a los héroes y villanos más emblemáticos del Universo Marvel en una batalla cósmica sin precedentes."',
    foto_comic: 'assets/img/secretwars.jpg',
    id_categoria: 1,
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


