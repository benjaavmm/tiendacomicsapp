import { Component } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
//ejemplos de comics de como se veria
export class CarritoPage {
  cartItems = [
    {
      title: 'The Flash N°52',
      price: 21990,
      image: 'assets/img/flash.jpg',
      quantity: 1
    },
    {
      title: 'Linterna Verde',
      price: 19990,
      image: 'assets/img/linternaverde.jpg',
      quantity: 1
    },
    {
      title: 'Batman',
      price: 23990,
      image: 'assets/img/batman1.jpg',
      quantity: 1
    }
  ];

  get totalPrice() {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  removeItem(item: any) {
    // Aun no lo vamos a hacer
  }

  checkout() {
    // INNECESARIO :)
  }
}
