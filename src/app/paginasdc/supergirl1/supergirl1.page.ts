import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supergirl1',
  templateUrl: './supergirl1.page.html',
  styleUrls: ['./supergirl1.page.scss'],
})
export class Supergirl1Page implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  constructor() { }

  ngOnInit() {
  }

  addToCart() {
    // Lógica para agregar al carrito
    console.log(`Añadido al carrito: Cantidad ${this.quantity}`);
  }
}
