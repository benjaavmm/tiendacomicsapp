// carrito.page.ts
import { Component } from '@angular/core';
import { CartService, Comic } from '../services/cart.service';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from '../../services/servicebd.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage {
  cartItems: Comic[];

  constructor(
    private cartService: CartService,
    private alertController: AlertController,
    private servicebd: ServicebdService
  ) {
    this.cartItems = this.cartService.getCartItems();
  }

  get totalPrice() {
    return this.cartItems.reduce((total, item) => total + (item.precio * item.quantity), 0);
  }

  removeItem(item: Comic) {
    this.cartService.removeItem(item);
    this.cartItems = this.cartService.getCartItems();
  }

  async checkout() {
    const alert = await this.alertController.create({
      header: 'Confirmar Pago',
      message: '¿Está seguro de querer comprar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Sí',
          handler: () => {
            this.processPayment();
          },
        },
      ],
    });

    await alert.present();
  }

  async processPayment() {
    const total = this.totalPrice;
    const currentUser = await this.servicebd.getCurrentUser().toPromise();
    const userId = currentUser?.id_usuario;

    if (userId) {
      const userIdNumber = Number(userId);
      const fechaVenta = new Date().toISOString().split('T')[0];
      const id_estado = 1;

      try {
        await this.servicebd.guardarVenta(fechaVenta, userIdNumber, total, this.cartItems, id_estado);
        
        this.cartService.clearCart();
        this.cartItems = this.cartService.getCartItems();

        const successAlert = await this.alertController.create({
          header: 'Pago Exitoso',
          message: 'Su compra ha sido realizada con éxito.',
          buttons: ['OK'],
        });

        await successAlert.present();
      } catch (error) {
        console.error('Error al procesar el pago:', error);
        const errorAlert = await this.alertController.create({
          header: 'Error',
          message: 'Hubo un problema al procesar su pago. Por favor, inténtelo de nuevo más tarde.',
          buttons: ['OK'],
        });
        await errorAlert.present();
      }
    } else {
      const errorAlert = await this.alertController.create({
        header: 'Error',
        message: 'No se pudo obtener el usuario actual.',
        buttons: ['OK'],
      });
      await errorAlert.present();
    }
  }

  increaseQuantity(item: Comic) {
    if (item.quantity < 10) {
      item.quantity += 1;
    }
  }

  decreaseQuantity(item: Comic) {
    if (item.quantity > 1) {
      item.quantity -= 1;
    }
}
}