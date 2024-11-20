import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from '../../services/servicebd.service';
import { firstValueFrom } from 'rxjs';
import { Comic } from '../../services/comic';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  cartItems: Comic[] = [];

  constructor(
    private cartService: CartService,
    private alertController: AlertController,
    private servicebd: ServicebdService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    this.cartItems = this.cartService.getCartItems();
  }

  get totalPrice() {
    return this.cartItems.reduce((total, item) => 
      total + (item.precio * (item.quantity || 1)), 0
    );
  }

  removeItem(item: Comic) {
    this.cartService.removeItem(item);
    this.loadCartItems();
  }

  updateQuantity(item: Comic, newQuantity: number) {
    if (newQuantity > 0 && newQuantity <= item.stock) {
      this.cartService.updateItemQuantity(item, newQuantity);
      this.loadCartItems();
    }
  }

  increaseQuantity(item: Comic) {
    const currentQuantity = item.quantity || 1;
    if (currentQuantity < item.stock) {
      this.updateQuantity(item, currentQuantity + 1);
    } else {
      this.showStockAlert();
    }
  }

  decreaseQuantity(item: Comic) {
    const currentQuantity = item.quantity || 1;
    if (currentQuantity > 1) {
      this.updateQuantity(item, currentQuantity - 1);
    }
  }

  async showStockAlert() {
    const alert = await this.alertController.create({
      header: 'Stock Insuficiente',
      message: 'No hay más unidades disponibles de este cómic.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async checkout() {
    const alert = await this.alertController.create({
      header: 'Confirmar Compra',
      message: `Total a pagar: $${this.totalPrice.toFixed(2)}`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.processPayment();
          }
        }
      ]
    });
    await alert.present();
  }

  async processPayment() {
    if (this.cartItems.length === 0) {
      const alert = await this.alertController.create({
        header: 'Carrito Vacío',
        message: 'Agrega cómics al carrito antes de realizar la compra.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const currentUser = await firstValueFrom(this.servicebd.getCurrentUser());
    if (!currentUser?.id_usuario) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Debes iniciar sesión para realizar la compra.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    try {
      const fechaVenta = new Date().toISOString();
      const total = this.totalPrice;
      const userId = Number(currentUser.id_usuario);
      const id_estado = 1;

      // Asegurarse de que cada item tenga una cantidad válida
      const itemsWithQuantity = this.cartItems.map(item => ({
        ...item,
        quantity: item.quantity || 1
      }));

      await this.servicebd.guardarVenta(
        fechaVenta,
        userId,
        total,
        itemsWithQuantity,
        id_estado
      );

      this.cartService.clearCart();
      this.loadCartItems();

      const successAlert = await this.alertController.create({
        header: 'Compra Exitosa',
        message: '¡Tu compra se ha realizado con éxito!',
        buttons: [
          {
            text: 'Ver Historial',
            handler: () => {
              this.router.navigate(['/historialcompras']);
            }
          }
        ]
      });
      await successAlert.present();
    } catch (error) {
      console.error('Error en el proceso de pago:', error);
      const errorAlert = await this.alertController.create({
        header: 'Error',
        message: 'Hubo un problema al procesar tu compra. Por favor, intenta nuevamente.',
        buttons: ['OK']
      });
      await errorAlert.present();
    }
  }
}