import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CartService, Comic } from '../../services/cart.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-thor',
  templateUrl: './thor.page.html',
  styleUrls: ['./thor.page.scss'],
})
export class ThorPage implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  // Define el objeto Comic
  comic: Comic = {
    id_comic: '15',
    nombre_comic: 'The Mighty Thor: The Wrath Of Odin!',
    precio: 21990,
    stock: 100,
    descripcion: '"The Mighty Thor: The Wrath of Odin!" sumerge a los lectores en una saga épica que sigue las hazañas del poderoso dios nórdico del trueno. Cuando el reino de Asgard se ve amenazado por una fuerza oscura ancestral, Thor se embarca en una búsqueda desesperada para salvar su hogar y proteger a los nueve reinos.',
    foto_comic: 'assets/img/thor.jpg',
    id_categoria: 'marvel',
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
