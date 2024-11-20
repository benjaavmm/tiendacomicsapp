import { Component, OnInit } from '@angular/core';
import { ServicebdService } from '../../services/servicebd.service';
import { CompraDetalle } from '../../services/compradetalle';
import { Comic } from '../../services/comic';

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
    this.isLoading = true;
    this.error = null;

    this.servicebd.getHistorialCompras().subscribe({
      next: (items) => {
        this.compras = items.sort((a, b) => 
          new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
        );
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar el historial:', error);
        this.error = 'No se pudo cargar el historial de compras';
        this.isLoading = false;
      }
    });
  }

  doRefresh(event: any) {
    this.loadHistorialCompras().then(() => {
      event.target.complete();
    });
  }

  getEstadoColor(idEstado: number): string {
    switch (idEstado) {
      case 1: return 'success';  // Completado
      case 2: return 'warning';  // Pendiente
      case 3: return 'danger';   // Cancelado
      default: return 'medium';
    }
  }

  getEstadoText(idEstado: number): string {
    switch (idEstado) {
      case 1: return 'Completado';
      case 2: return 'Pendiente';
      case 3: return 'Cancelado';
      default: return 'Desconocido';
    }
  }

  calcularSubtotal(items: Comic[]): number {
    return items.reduce((acc, item) => 
      acc + ((item.precio || 0) * (item.quantity || 0)), 0
    );
  }
}