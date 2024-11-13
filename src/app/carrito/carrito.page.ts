import { Component } from '@angular/core';
import { CartService, Comic } from '../services/cart.service';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from '../../services/servicebd.service';
import { firstValueFrom } from 'rxjs';

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
            console.log('Usuario ha confirmado el pago.');
            this.processPayment();
          },
        },
      ],
    });
  
    await alert.present();
  }

  async processPayment() {
    console.log('Iniciando proceso de pago...');
  
    // Verifica si hay cómics en el carrito
    if (this.cartItems.length === 0) {
      const alert = await this.alertController.create({
        header: 'Carrito Vacío',
        message: 'No hay cómics agregados en el carrito.',
        buttons: ['OK'],
      });
      await alert.present();
      return; // Salir del método si el carrito está vacío
    }
  
    const total = this.totalPrice;
    const currentUser = await firstValueFrom(this.servicebd.getCurrentUser());
    console.log('Usuario actual:', currentUser);
    const userId = currentUser?.id_usuario;
  
    if (userId) {
      const userIdNumber = Number(userId);
      const fechaVenta = new Date().toISOString();
      const id_estado = 1;
  
      // Crear un array de objetos del tipo Comic
      const comicsToSave: Comic[] = this.cartItems.map(item => ({
        id_comic: item.id_comic,
        nombre_comic: item.nombre_comic,
        precio: item.precio,
        foto_comic: item.foto_comic,
        quantity: item.quantity,
        stock: item.stock, // Asegúrate de incluir stock
        descripcion: item.descripcion, // Asegúrate de incluir descripcion
        id_categoria: item.id_categoria, // Asegúrate de incluir id_categoria
        link: item.link // Asegúrate de incluir link
      }));
  
      try {
        console.log('Guardando venta...', { fechaVenta, userIdNumber, total, comicsToSave });
        await this.servicebd.guardarVenta(fechaVenta, userIdNumber, total, comicsToSave, id_estado);
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
      console.error('No se pudo obtener el usuario actual.');
      const errorAlert = await this.alertController.create({
        header: 'Error',
        message: 'No se pudo obtener el usuario actual.',
        buttons: ['OK'],
      });
      await errorAlert.present();
    }
  }
  
  // Método para aumentar la cantidad de un artículo
  increaseQuantity(item: Comic) {
    item.quantity += 1; // Aumenta la cantidad en 1
  }
  
  // Método para disminuir la cantidad de un artículo
  decreaseQuantity(item: Comic) {
    if (item.quantity > 1) {
      item.quantity -= 1; // Disminuye la cantidad en 1
    }
  }
}  