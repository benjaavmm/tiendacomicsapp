import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spiderman',
  templateUrl: './spiderman.page.html',
  styleUrls: ['./spiderman.page.scss'],
})
export class SpidermanPage implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  constructor() { }

  ngOnInit() {
  }

  addToCart() {
    // Lógica para agregar al carrito
    console.log(`Añadido al carrito: Cantidad ${this.quantity}`);
  }
}

