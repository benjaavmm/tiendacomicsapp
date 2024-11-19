import { Component, OnInit } from '@angular/core';
import { ServicebdService } from '../../services/servicebd.service';
import { Comic, CompraDetalle } from '../../services/compradetalle'; 

@Component({
  selector: 'app-historialcompras',
  templateUrl: './historialcompras.page.html',
  styleUrls: ['./historialcompras.page.scss'],
})
export class HistorialComprasPage implements OnInit {
  compras: CompraDetalle[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  constructor(private servicebd: ServicebdService) {}

  ngOnInit() {
    this.loadHistorialCompras();
  }

  async loadHistorialCompras() {
    this.isLoading = true; // Mover la carga aquí para mejor manejo
    this.servicebd.getHistorialCompras().subscribe(
      (items) => {
        this.compras = items; // Asignar directamente los items devueltos
        this.isLoading = false; // Cambiar el estado de carga
      },
      (error) => {
        this.error = 'Error al cargar el historial de compras';
        this.isLoading = false; // Cambiar el estado de carga
        console.error('Error:', error);
      }
    );
  }

  // Calcular el subtotal para cada compra
  calcularSubtotal(items: Comic[]): number {
    return items.reduce((acc, item) => acc + (item.precio * item.quantity), 0);
  }
}
