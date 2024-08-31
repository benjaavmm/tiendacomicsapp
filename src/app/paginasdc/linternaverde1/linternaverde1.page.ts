import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-linternaverde1',
  templateUrl: './linternaverde1.page.html',
  styleUrls: ['./linternaverde1.page.scss'],
})
export class Linternaverde1Page implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  constructor() { }

  ngOnInit() {
  }

  addToCart() {
    // Lógica para agregar al carrito
    console.log(`Añadido al carrito: Cantidad ${this.quantity}`);
  }
}
