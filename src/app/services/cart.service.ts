import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Comic } from '../../services/comic';
import { ServicebdService } from '../../services/servicebd.service';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Comic[] = [];
  private cartItemCount = new BehaviorSubject(0);
  private cartTotal = new BehaviorSubject(0);

  constructor(private serviceBD: ServicebdService) {
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

  async addToCart(comic: Comic) {
    const stockDisponible = await this.serviceBD.verificarStockDisponible(comic.id_comic);
    
    if (stockDisponible === 0) {
      throw new Error('Este cómic no está disponible');
    }

    const existingItem = this.cartItems.find(item => item.id_comic === comic.id_comic);
    const newQuantity = (existingItem?.quantity || 0) + (comic.quantity || 1);

    if (newQuantity > stockDisponible) {
      throw new Error(`Stock insuficiente. Stock disponible: ${stockDisponible}`);
    }

    if (existingItem) {
      existingItem.quantity = newQuantity;
    } else {
      this.cartItems.push({
        ...comic,
        id_comic: Number(comic.id_comic),
        quantity: comic.quantity || 1
      });
    }

    this.updateCartCount();
    this.updateCartTotal();
    this.saveCartToStorage();
  }

  removeItem(comic: Comic) {
    const index = this.cartItems.findIndex(item => item.id_comic === comic.id_comic);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.updateCartCount();
      this.updateCartTotal();
      this.saveCartToStorage();
    }
  }

  updateItemQuantity(comic: Comic, quantity: number) {
    const item = this.cartItems.find(item => item.id_comic === comic.id_comic);
    if (item) {
      const stock = comic.stock; // Asegúrate de que el stock esté actualizado
      item.quantity = Math.min(quantity, stock); // Ajustar a la cantidad máxima disponible
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