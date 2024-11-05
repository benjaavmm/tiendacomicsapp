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
  private cartItems: Comic[] = [];

  addToCart(item: Comic) {
    const existingItem = this.cartItems.find(i => i.title === item.title);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cartItems.push(item);
    }
  }

  getCartItems(): Comic[] {
    return this.cartItems;
  }

  removeItem(item: Comic) {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
  }

  clearCart() {
    this.cartItems = [];
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalCost(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  isCartEmpty(): boolean {
    return this.cartItems.length === 0;
  }

  findItem(title: string): Comic | undefined {
    return this.cartItems.find(item => item.title === title);
  }
}
