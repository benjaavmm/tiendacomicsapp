import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';
import { Comic } from '../../../services/comic';

@Component({
  selector: 'app-naruto',
  templateUrl: './naruto.page.html',
  styleUrls: ['./naruto.page.scss'],
})
export class NarutoPage implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  // Define el objeto Comic
  comic: Comic = {
    id_comic: 7,
    nombre_comic: 'Naruto',
    precio: 11990,
    stock: 10,
    descripcion: '"Uno de los clones de Naruto se topa frente a frente con Sasuke, con lo que el grupo que ha salido en su búsqueda logra recuperar finalmente su rastro. Mientras tanto, Jiraiya se infiltra con éxito en Amegakure y comienza sus indagaciones acerca del líder de Akatsuki, pero este descubre su presencia y está decidido a eliminarlo. Nagato y Konan se enfrentan con Jiraiya, su antiguo maestro, quien ante el inmenso poder de sus ahora enemigos decide luchar ¡en modo sennin!"',
    foto_comic: 'assets/img/naruto.jpg',
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

