import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';
import { Comic } from '../../../services/comic';
@Component({
  selector: 'app-supergirl1',
  templateUrl: './supergirl1.page.html',
  styleUrls: ['./supergirl1.page.scss'],
})
export class Supergirl1Page implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  // Define el objeto Comic
  comic: Comic = {
    id_comic: 19, // Asegúrate de que este campo esté presente si es necesario
    nombre_comic: 'Supergirl #3: El Reinado de los Superhombres Cibernéticos',
    precio: 17000,
    stock: 100, // Si necesitas un stock
    descripcion: '"Descubre el emocionante capítulo de Supergirl #3, donde Kara Zor-El enfrenta una amenaza que golpea cerca del corazón..."',
    foto_comic: 'assets/img/Supergirl.jpg',
    id_categoria: 3,
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
