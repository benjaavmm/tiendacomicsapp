import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';
import { Comic } from '../../../services/comic';

@Component({
  selector: 'app-hxh',
  templateUrl: './hxh.page.html',
  styleUrls: ['./hxh.page.scss'],
})
export class HxhPage implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  // Define el objeto Comic
  comic: Comic = {
    id_comic: 26,
    nombre_comic: 'Hunter X Hunter',
    precio: 13990,
    stock: 10,
    descripcion: '"Empiezan las elecciones para elegir presidente, como dejó dicho Netero. Las elecciones se presentan movidas debido a las tretas de Pariston. Por su lado, Killua regresa a su casa para intentar salvar a Gon con la ayuda de Alluka. ¿¡Qué poderes tendrá Alluka!?"',
    foto_comic: 'assets/img/hxh.jpg',
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

