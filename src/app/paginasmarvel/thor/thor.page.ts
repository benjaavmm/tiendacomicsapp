import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';
import { Comic } from '../../../services/comic';

@Component({
  selector: 'app-thor',
  templateUrl: './thor.page.html',
  styleUrls: ['./thor.page.scss'],
})
export class ThorPage implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  // Define el objeto Comic
  comic: Comic = {
    id_comic: 15,
    nombre_comic: 'The Mighty Thor: The Wrath Of Odin!',
    precio: 21990,
    stock: 10,
    descripcion: '"The Mighty Thor: The Wrath of Odin!" sumerge a los lectores en una saga épica que sigue las hazañas del poderoso dios nórdico del trueno. Cuando el reino de Asgard se ve amenazado por una fuerza oscura ancestral, Thor se embarca en una búsqueda desesperada para salvar su hogar y proteger a los nueve reinos.',
    foto_comic: 'assets/img/thor.jpg',
    id_categoria: 1,
    quantity: 0 
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

