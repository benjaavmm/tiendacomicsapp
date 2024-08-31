import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ligadelajusticia1',
  templateUrl: './ligadelajusticia1.page.html',
  styleUrls: ['./ligadelajusticia1.page.scss'],
})
export class Ligadelajusticia1Page implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  constructor() { }

  ngOnInit() {
  }

  addToCart() {
    // Lógica para agregar al carrito
    console.log(`Añadido al carrito: Cantidad ${this.quantity}`);
  }
}
