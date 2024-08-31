import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-batman1',
  templateUrl: './batman1.page.html',
  styleUrls: ['./batman1.page.scss'],
})
export class Batman1Page implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  constructor() { }

  ngOnInit() {
  }

  addToCart() {
    // Lógica para agregar al carrito
    console.log(`Añadido al carrito: Cantidad ${this.quantity}`);
  }
}
