import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aquaman1',
  templateUrl: './aquaman1.page.html',
  styleUrls: ['./aquaman1.page.scss'],
})
export class Aquaman1Page implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  constructor() { }

  ngOnInit() {
  }

  addToCart() {
    // Lógica para agregar al carrito
    console.log(`Añadido al carrito: Cantidad ${this.quantity}`);
  }
}
