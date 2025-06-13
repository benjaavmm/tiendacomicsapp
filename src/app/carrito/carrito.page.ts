import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from '../../services/servicebd.service';
import { CurrencyService } from '../../services/currency.service'; 
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Comic } from '../../services/comic';
import { Router } from '@angular/router';
import { Usuario } from '../../services/usuario';

// Interfaces PayPal (Mantener igual)
interface PayPalOrderDetails {
  id: string;
  status: 'COMPLETED' | 'SAVED' | 'APPROVED' | 'VOIDED' | 'PAYER_ACTION_REQUIRED' | string;
  purchase_units: {
    amount: {
      currency_code: string;
      value: string;
    };
  }[];
  payer: {
    name?: {
      given_name?: string;
      surname?: string;
    };
    email_address?: string;
    payer_id?: string;
  };
  create_time?: string;
  update_time?: string;
}

interface PayPalError {
  message: string;
}

declare var paypal: any;

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit, AfterViewInit {
  cartItems: Comic[] = [];
  currentUser: Usuario | null = null;
  isPayPalButtonRendered = false;
  exchangeRate: number = 0.0011; // Tasa de cambio CLP a USD
  totalUSD: number = 0;

  constructor(
    private cartService: CartService,
    private alertController: AlertController,
    private servicebd: ServicebdService,
    private router: Router,
    private ngZone: NgZone,
    private currencyService: CurrencyService // Nuevo servicio de moneda
  ) {}

  ngOnInit() {
    this.loadCartItems();
    this.loadCurrentUser();
    this.updateExchangeRate();
  }

  // Método para actualizar tasa de cambio
  async updateExchangeRate() {
    try {
      this.exchangeRate = await firstValueFrom(
        this.currencyService.getCLPtoUSDRate()
      );
      console.log('Tasa de cambio actualizada:', this.exchangeRate);
    } catch (error) {
      console.error('Error actualizando tasa de cambio', error);
      // Usar tasa de respaldo
      this.exchangeRate = 0.0011;
    }
  }

  ngAfterViewInit() {
    if (this.cartItems.length > 0 && !this.isPayPalButtonRendered) {
      this.loadPayPalScript().then(() => {
        this.renderPayPalButton();
        this.isPayPalButtonRendered = true;
      }).catch(err => {
        console.error("Error cargando script de PayPal:", err);
        this.presentAlert('Error', 'No se pudo cargar el botón de pago.');
      });
    }
  }

  async loadCurrentUser() {
    try {
      this.currentUser = await firstValueFrom(this.servicebd.getCurrentUser());
    } catch (error) {
      console.error('Error cargando usuario', error);
    }
  }

  async loadCartItems() {
    this.cartItems = this.cartService.getCartItems();
    await this.updateStockForCartItems();
    this.calculateTotalUSD();

    if (this.cartItems.length > 0 && !this.isPayPalButtonRendered && typeof paypal !== 'undefined') {
      this.renderPayPalButton();
      this.isPayPalButtonRendered = true;
    } else if (this.cartItems.length === 0 && this.isPayPalButtonRendered) {
      const container = document.getElementById('paypal-button-container');
      if (container) container.innerHTML = '';
      this.isPayPalButtonRendered = false;
    }
  }

  // Calcular total en USD
  calculateTotalUSD() {
    const totalCLP = this.totalPrice;
    this.totalUSD = parseFloat((totalCLP * this.exchangeRate).toFixed(2));
  }

  async updateStockForCartItems() {
    for (const item of this.cartItems) {
      const stock = await this.servicebd.verificarStockDisponible(item.id_comic);
      item.stock = stock;
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
    this.calculateTotalUSD();
  }

  async updateQuantity(item: Comic, newQuantity: number) {
    const stock = await this.servicebd.verificarStockDisponible(item.id_comic);
    
    if (newQuantity > 0 && (newQuantity <= item.quantity || newQuantity <= stock)) {
      if (newQuantity > stock) {
        this.presentAlert('Stock Limitado', `Solo quedan ${stock} unidades disponibles.`);
        item.quantity = stock;
        this.cartService.updateItemQuantity(item, stock);
      } else {
        this.cartService.updateItemQuantity(item, newQuantity);
      }
      this.loadCartItems();
      this.calculateTotalUSD();
    } else if (newQuantity > stock) {
      this.presentAlert('Stock Insuficiente', `No hay ${newQuantity} unidades disponibles. Stock actual: ${stock}`);
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

  // Cargar script de PayPal
  loadPayPalScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof paypal !== 'undefined') {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = "https://www.paypal.com/sdk/js?client-id=AVOh689GV5C9Qmfuoqsems26uMX-UHnKJ5wBkPaeeu1R9c0Y7jazTsPoVqtMYBt3fuFEPcbJtrzXfcM3&currency=USD";
      script.onload = () => resolve();
      script.onerror = (e) => reject(e);
      document.body.appendChild(script);
    });
  }

  // Renderizar botón de PayPal
  renderPayPalButton() {
    const container = document.getElementById('paypal-button-container');
    if (!container) {
      console.error("Contenedor de botón PayPal no encontrado.");
      return;
    }
    container.innerHTML = '';

    paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'blue',
        shape: 'rect',
        label: 'paypal'
      },
      createOrder: (data: any, actions: any) => {
        // Validaciones previas
        if (!this.currentUser?.id_usuario) {
          this.presentAlert('Error', 'Debes iniciar sesión para realizar la compra.');
          return Promise.reject(new Error('Usuario no logueado'));
        }

        if (this.cartItems.length === 0) {
          this.presentAlert('Error', 'Tu carrito está vacío.');
          return Promise.reject(new Error('Carrito vacío'));
        }

        // Verificar stock
        return this.verificarStockCarrito().then(stockSuficiente => {
          if (!stockSuficiente) {
            this.presentAlert('Stock Insuficiente', 'Algunos artículos ya no tienen stock suficiente.');
            return Promise.reject(new Error('Stock insuficiente'));
          }

          console.log(`Creando orden con total USD: ${this.totalUSD}`);
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: this.totalUSD.toString(),
                currency_code: 'USD'
              }
            }]
          });
        });
      },
      onApprove: (data: { orderID: string }, actions: any) => {
        return actions.order.capture().then((details: PayPalOrderDetails) => {
          this.ngZone.run(async () => {
            await this.procesarPagoExitosoPayPal(details);
          });
        }).catch((error: any) => {
          console.error('Error al capturar la orden:', error);
          this.ngZone.run(() => {
            this.presentAlert('Error de Pago', 'Hubo un problema al finalizar tu pago.');
          });
        });
      },
      onError: (err: PayPalError) => {
        console.error('Error en PayPal:', err);
        this.ngZone.run(() => {
          const userMessage = err.message 
            ? `Error de PayPal: ${err.message.substring(0, 100)}`
            : 'Hubo un error inesperado con PayPal.';
          this.presentAlert('Error de PayPal', userMessage);
        });
      },
      onCancel: (data: any) => {
        console.log('Pago cancelado por el usuario:', data);
        this.ngZone.run(() => {
          this.presentAlert('Pago Cancelado', 'Has cancelado el proceso de pago.');
        });
      }
    }).render('#paypal-button-container').catch((err: any) => {
      console.error("Error renderizando botones de PayPal:", err);
      this.presentAlert('Error', 'No se pudo mostrar el botón de pago.');
    });
  }

  // Procesar pago exitoso
  async procesarPagoExitosoPayPal(details: PayPalOrderDetails) {
  try {
    console.log('Procesando pago exitoso. Detalles de PayPal:', JSON.stringify(details, null, 2));

    // Re-validar usuario y carrito (defensivo)
    if (!this.currentUser?.id_usuario) {
      console.error("Usuario no encontrado al procesar pago.");
      await this.presentAlert('Error Interno', 'No se pudo identificar al usuario. Por favor, inicia sesión de nuevo.');
      return;
    }
    const userId = Number(this.currentUser.id_usuario); // Asegurar que es número

    if (this.cartItems.length === 0) {
      console.error("Carrito vacío al procesar pago.");
      // Esto no debería pasar si createOrder funcionó, pero por si acaso.
      await this.presentAlert('Error', 'Tu carrito está vacío. No se puede procesar la compra.');
      return;
    }

    // Verificación final de stock antes de guardar (muy importante)
    const stockSuficiente = await this.verificarStockCarrito();
    if (!stockSuficiente) {
      console.error("Stock insuficiente detectado JUSTO ANTES de guardar la venta.");
      await this.loadCartItems(); // Actualizar vista del carrito
      await this.presentAlert('Stock Insuficiente', 'Lo sentimos, el stock de uno o más artículos cambió mientras pagabas. Revisa tu carrito.');
      // Aquí NO se debería proceder a guardar la venta. PayPal ya capturó el dinero.
      // Se necesita un proceso manual o automático para reembolsar o manejar esto.
      // Por ahora, informamos al usuario y NO guardamos la venta.
      // TODO: Implementar lógica de manejo para esta situación (ej. marcar orden para revisión/reembolso).
      console.warn(`ALERTA: Pago ${details.id} completado pero stock insuficiente. Venta NO guardada. Requiere acción manual.`);
      await this.presentAlert('Acción Requerida', `Tu pago fue procesado (${details.id}), pero el stock cambió. Contacta a soporte para resolverlo.`);
      return; // Detener ejecución aquí
    }

    // Cálculo de total CLP basado en la tasa de cambio actual y el valor USD de PayPal
    const totalUSDConfirmado = parseFloat(details.purchase_units[0].amount.value);
    const totalCLPCalculado = Math.round(totalUSDConfirmado / this.exchangeRate);

    console.log('Información para guardar venta:', {
      totalUSDConfirmado,
      totalCLPCalculado,
      exchangeRateUsada: this.exchangeRate,
      userId,
      paypalOrderId: details.id,
      paypalStatus: details.status
    });

    // Preparar items con cantidad asegurada
    const itemsParaGuardar = this.cartItems.map(item => ({
      ...item,
      quantity: item.quantity || 1 // Asegurar que quantity es un número > 0
    })).filter(item => item.quantity > 0); // Filtrar items con cantidad 0 por si acaso

    if (itemsParaGuardar.length === 0) {
        console.error("No hay items válidos para guardar en la venta después del filtrado.");
        await this.presentAlert('Error Interno', 'No se encontraron items válidos para registrar en tu compra.');
        // Considerar reembolso o manejo especial aquí también.
        return;
    }

    try {
      // Guardar la venta en la BD
      const id_venta = await this.servicebd.guardarVenta(
        new Date().toISOString(), // Usar fecha actual en UTC
        userId,
        totalCLPCalculado,
        itemsParaGuardar,
        2, // Estado: Completado
        details.id, // paypal_order_id
        details.status, // paypal_status
        details.payer?.payer_id, // paypal_payer_id
        details.create_time || details.update_time || new Date().toISOString() // paypal_payment_time
      );

      console.log(`Venta guardada exitosamente en BD local. ID de venta: ${id_venta}`);

      // Limpiar carrito local
      this.cartService.clearCart();
      await this.loadCartItems(); // Actualizar la vista del carrito (debería estar vacío)

      // Mostrar mensaje de éxito al usuario
      const successAlert = await this.alertController.create({
        header: 'Compra Exitosa',
        message: `¡Tu compra se ha realizado con éxito! ID de Orden PayPal: ${details.id}. Total: $${totalCLPCalculado.toLocaleString('es-CL')} CLP.`,
        buttons: [
          {
            text: 'Ver Historial',
            handler: () => {
              this.router.navigate(['/historialcompras']);
            }
          },
          {
            text: 'OK',
            role: 'cancel'
          }
        ]
      });
      await successAlert.present();

    } catch (guardarVentaError) {
      // Error específico al intentar guardar la venta DESPUÉS de un pago exitoso
      console.error('ERROR CRÍTICO: Pago PayPal exitoso pero falló al guardar la venta en BD:', guardarVentaError);

      // Extraer mensaje de error (puede ser el "Error desconocido" que estamos tratando)
      const errorMessage = guardarVentaError instanceof Error
        ? guardarVentaError.message
        : 'Error desconocido al guardar la venta'; // Mantener el fallback

      // Informar al usuario de la situación grave
      await this.presentAlert('Error Post-Pago Crítico', `Tu pago fue exitoso (ID: ${details.id}), pero hubo un problema al registrar tu compra localmente: "${errorMessage}". Por favor, contacta a soporte INMEDIATAMENTE con tu ID de orden PayPal.`);

      // Log adicional para depuración profunda
      console.error('Detalles completos del error al guardar venta:', {
        originalError: guardarVentaError,
        extractedMessage: errorMessage,
        paypalDetails: details,
        cartItemsAlMomentoDelError: itemsParaGuardar, // Usar los items que se intentaron guardar
        usuario: this.currentUser
      });
      // NO limpiar el carrito en este caso, para que el usuario vea lo que intentó comprar.
      // TODO: Implementar un mecanismo para reintentar guardar la venta o marcarla para revisión manual.
    }

  } catch (error) {
    // Capturar cualquier otro error inesperado durante el procesamiento post-pago
    console.error('Error general inesperado en procesarPagoExitosoPayPal:', error);

    const errorMessage = error instanceof Error ? error.message : 'Error inesperado';

    await this.presentAlert('Error Post-Pago General', `Ocurrió un problema inesperado después de tu pago: ${errorMessage}. Por favor, contacta a soporte.`);

    console.error('Detalles completos del error general:', {
      originalError: error,
      paypalDetails: details, // Incluir detalles de PayPal si están disponibles
      cartItems: this.cartItems,
      usuario: this.currentUser
    });
  }
}


  // Verificar stock antes de crear orden
  async verificarStockCarrito(): Promise<boolean> {
    for (const item of this.cartItems) {
      const stockActual = await this.servicebd.verificarStockDisponible(item.id_comic);
      if ((item.quantity || 1) > stockActual) {
        console.warn(`Stock insuficiente para ${item.nombre_comic}. Solicitado: ${item.quantity}, Disponible: ${stockActual}`);
        item.stock = stockActual;
        return false;
      }
    }
    return true;
  }

  // Mostrar alerta
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
