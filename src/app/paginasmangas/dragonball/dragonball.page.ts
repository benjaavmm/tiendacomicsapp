import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CartService, Comic } from '../../services/cart.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-dragonball',
  templateUrl: './dragonball.page.html',
  styleUrls: ['./dragonball.page.scss'],
})
export class DragonballPage implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  // Define el objeto Comic
  comic: Comic = {
    id_comic: '4',
    nombre_comic: 'Dragon Ball #12: El Desafío de Goku y Vegeta',
    precio: 13990,
    stock: 100,
    descripcion: '"En esta emocionante entrega de Dragon Ball, los legendarios guerreros Goku y Vegeta se enfrentan a un enemigo formidable lo cual promete acción, poder y emociones intensas. ¡No te pierdas esta emocionante entrega de Dragon Ball!"',
    foto_comic: 'assets/img/dragonball.jpg',
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
