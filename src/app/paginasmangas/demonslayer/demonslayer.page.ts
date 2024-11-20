import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';
import { Comic } from '../../../services/comic';

@Component({
  selector: 'app-demonslayer',
  templateUrl: './demonslayer.page.html',
  styleUrls: ['./demonslayer.page.scss'],
})
export class DemonslayerPage implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  // Define el objeto Comic
  comic: Comic = {
    id_comic: 5,
    nombre_comic: 'Demon Slayer',
    precio: 11990,
    stock: 100,
    descripcion: '"Un día que Tanjiro estaba volviendo de sus labores, un aldeano le sugiere pasar la noche en su casa para prevenir que se lo morfe un Oni. Tanjiro acepta, pero cuando finalmente regresa a su hogar, descubre que aunque él zafó, toda su familia fue devorada por un demonio, salvo su hermanita Nezuko, ¡que terminó convertida en uno de ellos! En su desesperación por encontrar ayuda, Tanjiro se topa con un asesino de demonios llamado Giyu Tomioka, quien descubre que extrañamente Nezuko retiene suficiente de su humanidad para querer proteger a su hermano. Sorprendido por esto, y por las habilidades de combate del chico, le sugiere que vaya a visitar a su maestro… Así comienzan las aventuras de Tanjiro para convertirse en un asesino de demonios y lograr encontrar tanto una cura para su hermana, como al asesino de su familia, mientras se topa con amigos y rivales de lo más inesperados."',
    foto_comic: 'assets/img/demonslayer.jpg',
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
