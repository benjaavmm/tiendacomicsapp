import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Comic } from '../../services/comic';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Comic[] = [];
  private cartItemCount = new BehaviorSubject(0);
  private cartTotal = new BehaviorSubject(0);

  constructor() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        this.cartItems = parsedCart.map((item: Comic) => ({
          ...item,
          id_comic: Number(item.id_comic)
        }));
        this.updateCartCount();
        this.updateCartTotal();
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        this.cartItems = [];
      }
    }
  }

  addToCart(comic: Comic) {
    const existingItem = this.cartItems.find(item => item.id_comic === Number(comic.id_comic));
    
    if (existingItem) {
      // Si el item ya existe, sumamos la nueva cantidad
      const newQuantity = (existingItem.quantity || 0) + (comic.quantity || 1);
      // Verificamos que no exceda el stock
      existingItem.quantity = Math.min(newQuantity, comic.stock);
    } else {
      // Si es un nuevo item, respetamos la cantidad especificada o usamos 1 como valor predeterminado
      const newItem: Comic = {
        ...comic,
        id_comic: Number(comic.id_comic),
        quantity: comic.quantity || 1
      };
      // Verificamos que la cantidad inicial no exceda el stock
      newItem.quantity = Math.min(newItem.quantity, comic.stock);
      this.cartItems.push(newItem);
    }

    this.updateCartCount();
    this.updateCartTotal();
    this.saveCartToStorage();
  }

  removeItem(comic: Comic) {
    const index = this.cartItems.findIndex(item => item.id_comic === Number(comic.id_comic));
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.updateCartCount();
      this.updateCartTotal();
      this.saveCartToStorage();
    }
  }

  updateItemQuantity(comic: Comic, quantity: number) {
    const item = this.cartItems.find(item => item.id_comic === Number(comic.id_comic));
    if (item) {
      // Asegurarnos de que la cantidad no exceda el stock
      item.quantity = Math.min(quantity, comic.stock);
      this.updateCartCount();
      this.updateCartTotal();
      this.saveCartToStorage();
    }
  }

  getCartItems(): Comic[] {
    return [...this.cartItems];
  }

  getCartItemCount() {
    return this.cartItemCount.asObservable();
  }

  getCartTotal() {
    return this.cartTotal.asObservable();
  }

  clearCart() {
    this.cartItems = [];
    this.updateCartCount();
    this.updateCartTotal();
    localStorage.removeItem('cart');
  }

  private updateCartCount() {
    const count = this.cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
    this.cartItemCount.next(count);
  }

  private updateCartTotal() {
    const total = this.cartItems.reduce((sum, item) => sum + (item.precio * (item.quantity || 0)), 0);
    this.cartTotal.next(total);
  }

  private saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  isInCart(comicId: number | string): boolean {
    const numericId = Number(comicId);
    return this.cartItems.some(item => item.id_comic === numericId);
  }

  getItemQuantity(comicId: number): number {
    const item = this.cartItems.find(item => item.id_comic === comicId);
    return item ? item.quantity || 0 : 0;
  }
}
