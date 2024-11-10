import { Component } from '@angular/core';
import { ServicebdService } from '../../services/servicebd.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-historialcompra',
  templateUrl: './historialcompras.page.html',
  styleUrls: ['./historialcompras.page.scss'],
})
export class HistorialCompraPage {
  historialCompras$?: Observable<any[]>;
  cartItems: any[] = []; // Agregar esta propiedad
  totalPrice: number = 0; // Agregar esta propiedad

  constructor(private servicebd: ServicebdService) {
    this.loadHistorialCompras();
  }

  loadHistorialCompras() {
    this.historialCompras$ = this.servicebd.getHistorialCompras();
    this.historialCompras$.subscribe(items => {
      this.cartItems = items; // Asignar los items al carrito
      this.calculateTotal(); // Calcular el total
    });
  }

  removeItem(item: any) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.id_comic !== item.id_comic);
    this.calculateTotal(); // Recalcular el total después de eliminar
  }

  increaseQuantity(item: any) {
    const cartItem = this.cartItems.find(cartItem => cartItem.id_comic === item.id_comic);
    if (cartItem) {
      cartItem.quantity++;
      this.calculateTotal(); // Recalcular el total después de aumentar cantidad
    }
  }

  decreaseQuantity(item: any) {
    const cartItem = this.cartItems.find(cartItem => cartItem.id_comic === item.id_comic);
    if (cartItem && cartItem.quantity > 1) {
      cartItem.quantity--;
      this.calculateTotal(); // Recalcular el total después de disminuir cantidad
    }
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((total, item) => total + (item.precio * item.quantity), 0);
  }

  checkout() {
    // Implementa la lógica de compra aquí
    console.log('Procediendo a la compra', this.cartItems);
  }
}
