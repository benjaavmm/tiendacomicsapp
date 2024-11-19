import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CartService, Comic } from '../../services/cart.service';

@Component({
  selector: 'app-spiderman',
  templateUrl: './spiderman.page.html',
  styleUrls: ['./spiderman.page.scss'],
})
export class SpidermanPage implements OnInit {
  quantity: number = 1;

  comic: Comic = {
    id_comic: '8',
    nombre_comic: 'The Amazing Spider-Man',
    precio: 18990,
    stock: 100,
    descripcion: '"The Amazing Spider-Man, un pilar del universo Marvel Comics, sigue las hazañas de Peter Parker, un estudiante de secundaria que adquiere habilidades arácnidas tras ser mordido por una araña radioactiva. Enfrentando desafíos personales y supervillanos icónicos, Spider-Man lucha contra el crimen en Nueva York mientras equilibra su vida como héroe y su identidad secreta."',
    foto_comic: 'assets/img/spiderman.jpg',
    id_categoria: 'marvel',
    quantity: 0,
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

