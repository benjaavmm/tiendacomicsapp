import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from '../../services/servicebd.service';
import { firstValueFrom } from 'rxjs';
import { Comic } from '../../services/comic';
import { Router } from '@angular/router';

// Interfaces para tipado PayPal
interface PayPalActions {
  order: {
    create(data: any): Promise<string>;
    capture(): Promise<PayPalOrderDetails>;
  };
}

interface PayPalOrderDetails {
  payer: {
    name: {
      given_name: string;
      surname?: string;
    };
    email_address?: string;
  };
  id?: string;
  status?: string;
}

interface PayPalError {
  message: string;
}

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit, AfterViewInit {
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

  ngAfterViewInit() {
    this.loadPayPalScript().then(() => {
      this.renderPayPalButton();
    });
  }

  async loadCartItems() {
    this.cartItems = this.cartService.getCartItems();
    await this.updateStockForCartItems(); // Actualizar el stock al cargar el carrito
  }

  async updateStockForCartItems() {
    for (const item of this.cartItems) {
      const stock = await this.servicebd.verificarStockDisponible(item.id_comic);
      item.stock = stock; // Actualizar el stock del item en el carrito
    }
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

  async updateQuantity(item: Comic, newQuantity: number) {
    const stock = await this.servicebd.verificarStockDisponible(item.id_comic);
    if (newQuantity > 0 && newQuantity <= stock) {
      this.cartService.updateItemQuantity(item, newQuantity);
      this.loadCartItems();
    } else {
      this.showStockAlert();
    }
  }

  increaseQuantity(item: Comic) {
    const currentQuantity = item.quantity || 1;
    this.updateQuantity(item, currentQuantity + 1);
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

  loadPayPalScript(): Promise<void> {
    return new Promise((resolve) => {
      if ((<any>window).paypal) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = "https://www.paypal.com/sdk/js?client-id=AVOh689GV5C9Qmfuoqsems26uMX-UHnKJ5wBkPaeeu1R9c0Y7jazTsPoVqtMYBt3fuFEPcbJtrzXfcM3&currency=USD";
      script.onload = () => {
        resolve();
      };
      document.body.appendChild(script);
    });
  }

  renderPayPalButton() {
    (<any>window).paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'blue',
        shape: 'rect',
        label: 'paypal'
      },
      createOrder: (data: unknown, actions: PayPalActions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: this.totalPrice.toFixed(2)
            }
          }]
        });
      },
      onApprove: (data: unknown, actions: PayPalActions) => {
        return actions.order.capture().then((details: PayPalOrderDetails) => {
          alert(`Pago completado por ${details.payer.name.given_name}`);
          this.processSuccessfulPayment();
        });
      },
      onError: (err: PayPalError) => {
        console.error('Error en PayPal:', err.message);
        alert('Hubo un error con el pago de PayPal.');
      },
      onCancel: () => {
        alert('Pago cancelado.');
      }
    }).render('#paypal-button-container');
  }

  processSuccessfulPayment() {
    this.processPayment();
  }
}
