import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';
import { Comic } from '../../../services/comic';

@Component({
  selector: 'app-tokyorevengers',
  templateUrl: './tokyorevengers.page.html',
  styleUrls: ['./tokyorevengers.page.scss'],
})
export class TokyorevengersPage implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  // Define el objeto Comic
  comic: Comic = {
    id_comic: 8,
    nombre_comic: 'Tokyo Revengers',
    precio: 12990,
    stock: 100,
    descripcion: '"Takemichi, un fracasado que fue miembro de una banda en su juventud, salta 12 años atrás en el tiempo para volver al instituto y salvar a su exnovia, Hina, que en la actualidad ha sido asesinada por la organización criminal Tokyo Manjikai. Con cada viaje temporal, Takemichi influye en los que le rodean y poco a poco va cambiando el pasado… ¿pero eso será suficiente para salvar a Hina y evitar que la Tokyo Manjikai se convierta en una temida banda criminal?"',
    foto_comic: 'assets/img/tokyorevengers.jpg',
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

