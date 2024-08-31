import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-capitanamerica',
  templateUrl: './capitanamerica.page.html',
  styleUrls: ['./capitanamerica.page.scss'],
})
export class CapitanamericaPage implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  constructor() { }

  ngOnInit() {
  }

  addToCart() {
    // Lógica para agregar al carrito
    console.log(`Añadido al carrito: Cantidad ${this.quantity}`);
  }
}
