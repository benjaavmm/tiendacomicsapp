import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flash1',
  templateUrl: './flash1.page.html',
  styleUrls: ['./flash1.page.scss'],
})
export class Flash1Page implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  constructor() { }

  ngOnInit() {
  }

  addToCart() {
    // Lógica para agregar al carrito
    console.log(`Añadido al carrito: Cantidad ${this.quantity}`);
  }
}
