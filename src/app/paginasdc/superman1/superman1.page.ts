import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-superman1',
  templateUrl: './superman1.page.html',
  styleUrls: ['./superman1.page.scss'],
})
export class Superman1Page implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  constructor() { }

  ngOnInit() {
  }

  addToCart() {
    // Lógica para agregar al carrito
    console.log(`Añadido al carrito: Cantidad ${this.quantity}`);
  }
}

