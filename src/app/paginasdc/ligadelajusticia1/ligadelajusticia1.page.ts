import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';
import { Comic } from '../../../services/comic';

@Component({
  selector: 'app-ligadelajusticia1',
  templateUrl: './ligadelajusticia1.page.html',
  styleUrls: ['./ligadelajusticia1.page.scss'],
})
export class Ligadelajusticia1Page implements OnInit {
  quantity: number = 1;

  comic: Comic = {
    id_comic: 18,
    nombre_comic: 'Liga De La Justicia #27: Legado',
    precio: 29990,
    stock: 10,
    descripcion: '"La Liga de la Justicia enfrenta a su mayor amenaza en la historia: Legado, donde héroes y villanos colisionan."',
    foto_comic: 'assets/img/ligadelajusticia1.jpg',
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