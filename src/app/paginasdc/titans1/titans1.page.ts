import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';
import { Comic } from '../../../services/comic';

@Component({
  selector: 'app-titans1',
  templateUrl: './titans1.page.html',
  styleUrls: ['./titans1.page.scss'],
})
export class Titans1Page implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  // Define el objeto Comic
  comic: Comic = {
    id_comic: 21, // Asegúrate de que este campo esté presente si es necesario
    nombre_comic: 'Jóvenes Titanes #1: El Reinado de los Superhombres Cibernéticos',
    precio: 19900,
    stock: 10, // Si necesitas un stock
    descripcion: '"En este emocionante número, los Jóvenes Titanes están más separados que nunca. Damian Wayne, también conocido como Robin, recluta a Starfire, Raven, Beast Boy y el nuevo Kid Flash para unirse en una pelea contra su propio abuelo, Ra s al Ghul. Pero el verdadero liderazgo va más allá de tener la última palabra. ¿Está Robin realmente a la altura de la tarea? ¿O los Jóvenes Titanes rechazarán a este diminuto dictador? Este cómic promete acción, intriga y dilemas morales mientras los Jóvenes Titanes se enfrentan a un enemigo que amenaza su unidad y su mundo."',
    foto_comic: 'assets/img/titans.png',
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
