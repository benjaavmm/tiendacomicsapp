import { Component } from '@angular/core';
import { CartService, Comic } from '../services/cart.service'; 

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage {
  cartItems: Comic[]; 

  constructor(private cartService: CartService) {
    this.cartItems = this.cartService.getCartItems(); 
  }

  // Método para calcular el precio total del carrito
  get totalPrice() {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Método para eliminar un ítem del carrito
  removeItem(item: Comic) {
    this.cartService.removeItem(item); // Llama al método del servicio para eliminar
    this.cartItems = this.cartService.getCartItems(); // Actualiza la lista de items en el carrito
  }

  // Método de checkout (puedes implementarlo más adelante)
  checkout() {
    // INNECESARIO por ahora :)
  }

  // Método para aumentar la cantidad de un ítem
  increaseQuantity(item: Comic) {
    if (item.quantity < 10) {
      item.quantity += 1; // Incrementa la cantidad
    }
  }

  // Método para disminuir la cantidad de un ítem
  decreaseQuantity(item: Comic) {
    if (item.quantity > 1) {
      item.quantity -= 1; // Decrementa la cantidad
    }
  }
}
