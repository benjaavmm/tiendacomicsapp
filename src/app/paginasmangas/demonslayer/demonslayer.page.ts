import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demonslayer',
  templateUrl: './demonslayer.page.html',
  styleUrls: ['./demonslayer.page.scss'],
})
export class DemonslayerPage implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  constructor() { }

  ngOnInit() {
  }

  addToCart() {
    // Lógica para agregar al carrito
    console.log(`Añadido al carrito: Cantidad ${this.quantity}`);
  }
}
