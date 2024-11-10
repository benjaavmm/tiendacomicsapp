import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CartService, Comic } from '../../services/cart.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-hxh',
  templateUrl: './hxh.page.html',
  styleUrls: ['./hxh.page.scss'],
})
export class HxhPage implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  // Define el objeto Comic
  comic: Comic = {
    id_comic: '26',
    nombre_comic: 'Hunter X Hunter',
    precio: 13990,
    stock: 100,
    descripcion: '"Empiezan las elecciones para elegir presidente, como dejó dicho Netero. Las elecciones se presentan movidas debido a las tretas de Pariston. Por su lado, Killua regresa a su casa para intentar salvar a Gon con la ayuda de Alluka. ¿¡Qué poderes tendrá Alluka!?"',
    foto_comic: 'assets/img/hxh.jpg',
    id_categoria: 'mangas',
    quantity: 0 // Este valor se actualizará al añadir al carrito
    ,
    link: ''
  };

  constructor(private alertCtrl: AlertController, private cartService: CartService) { }

  ngOnInit() {
  }

  async addToCart() {
    // Añade el cómic al carrito
    this.cartService.addToCart({ ...this.comic, quantity: this.quantity });

    const alert = await this.alertCtrl.create({
      header: 'Añadido al Carro',
      message: `Has añadido ${this.quantity} de ${this.comic.nombre_comic} al carrito.`,
      buttons: ['OK']
    });
    await alert.present();
  }
}
