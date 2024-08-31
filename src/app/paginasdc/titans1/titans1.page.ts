import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-titans1',
  templateUrl: './titans1.page.html',
  styleUrls: ['./titans1.page.scss'],
})
export class Titans1Page implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  constructor() { }

  ngOnInit() {
  }

  addToCart() {
    // Lógica para agregar al carrito
    console.log(`Añadido al carrito: Cantidad ${this.quantity}`);
  }
}
