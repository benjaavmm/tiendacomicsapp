import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';
import { Comic } from '../../../services/comic';

@Component({
  selector: 'app-jujutsukaisen',
  templateUrl: './jujutsukaisen.page.html',
  styleUrls: ['./jujutsukaisen.page.scss'],
})
export class JujutsukaisenPage implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  // Define el objeto Comic
  comic: Comic = {
    id_comic: 22,
    nombre_comic: 'Jujutsu Kaisen',
    precio: 13990,
    stock: 10,
    descripcion: '"Sukuna es libre por un momento, y sus acciones atroces provocan gravísimos daños en el distrito de Shibuya. Por otro lado, un hechicero maléfico ataca por la espalda a Fushiguro y le inflige una herida fatal, por lo que no le queda otro remedio de usar su as bajo la manga."',
    foto_comic: 'assets/img/jujutsukaisen.jpg',
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


