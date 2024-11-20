import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';
import { Comic } from '../../../services/comic';

@Component({
  selector: 'app-dragonball',
  templateUrl: './dragonball.page.html',
  styleUrls: ['./dragonball.page.scss'],
})
export class DragonballPage implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  // Define el objeto Comic
  comic: Comic = {
    id_comic: 4,
    nombre_comic: 'Dragon Ball #12: El Desafío de Goku y Vegeta',
    precio: 13990,
    stock: 100,
    descripcion: '"En esta emocionante entrega de Dragon Ball, los legendarios guerreros Goku y Vegeta se enfrentan a un enemigo formidable lo cual promete acción, poder y emociones intensas. ¡No te pierdas esta emocionante entrega de Dragon Ball!"',
    foto_comic: 'assets/img/dragonball.jpg',
    id_categoria: 2,
    quantity: 0 // Este valor se actualizará al añadir al carrito
    ,
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
