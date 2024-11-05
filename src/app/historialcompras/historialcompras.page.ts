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

  constructor(private servicebd: ServicebdService) {
    this.loadHistorialCompras();
  }

  loadHistorialCompras() {
    this.historialCompras$ = this.servicebd.getHistorialCompras();
  }
}
