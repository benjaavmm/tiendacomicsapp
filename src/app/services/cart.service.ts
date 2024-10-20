import { Injectable } from '@angular/core';

// Interfaz para definir la estructura de un cómic
export interface Comic {
  title: string;
  price: number;
  image: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Arreglo para almacenar los artículos del carrito
  private cartItems: Comic[] = [];

  // Método para añadir un cómic al carrito
  addToCart(item: Comic) {
    const existingItem = this.cartItems.find(i => i.title === item.title);
    if (existingItem) {
      existingItem.quantity += item.quantity; // Aumenta la cantidad si ya existe
    } else {
      this.cartItems.push(item); // Agrega el nuevo ítem
    }
  }

  // Método para obtener los artículos del carrito
  getCartItems(): Comic[] {
    return this.cartItems;
  }

  // Método para eliminar un cómic del carrito
  removeItem(item: Comic) {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
  }

  // Método para limpiar el carrito
  clearCart() {
    this.cartItems = [];
  }

  // Método para obtener la cantidad total de artículos en el carrito
  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  // Método para obtener el total del costo del carrito
  getTotalCost(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Método para verificar si el carrito está vacío
  isCartEmpty(): boolean {
    return this.cartItems.length === 0;
  }

  // Método para buscar un cómic específico en el carrito
  findItem(title: string): Comic | undefined {
    return this.cartItems.find(item => item.title === title);
  }
}
