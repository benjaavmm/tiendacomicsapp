import { Component } from '@angular/core';
import { ServicebdService } from '../../services/servicebd.service';
import { Observable } from 'rxjs';
import { Comic } from '../../services/comic'; // Asegúrate de importar la clase Comic

@Component({
  selector: 'app-historialcompras',
  templateUrl: './historialcompras.page.html',
  styleUrls: ['./historialcompras.page.scss'],
})
export class HistorialComprasPage {
  historialCompras$?: Observable<any[]>;
  comprasPorFecha: { fecha: string; items: { comic: Comic; cantidad: number }[] }[] = [];
  totalPrice: number = 0;

  constructor(private servicebd: ServicebdService) {
    this.loadHistorialCompras();
  }

  loadHistorialCompras() {
    this.historialCompras$ = this.servicebd.getHistorialCompras();
    this.historialCompras$.subscribe(items => {
      this.groupComprasPorFecha(items);
    });
  }

  groupComprasPorFecha(items: any[]) {
    const grouped = items.reduce((acc, item) => {
      const fecha = item.f_venta.split('T')[0]; // Formato de fecha ISO
      if (!acc[fecha]) {
        acc[fecha] = { fecha, items: [] };
      }
      // Suponiendo que 'item' tiene las propiedades del cómic y 'cantidad'
      acc[fecha].items.push({ comic: item, cantidad: item.cantidad }); // Aquí se usa 'cantidad'
      return acc;
    }, {});

    this.comprasPorFecha = Object.values(grouped);
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalPrice = this.comprasPorFecha.reduce((total, compra) => {
      const compraTotal = compra.items.reduce((subtotal, item) => subtotal + (item.comic.precio * item.cantidad), 0);
      return total + compraTotal;
    }, 0);
  }
}
