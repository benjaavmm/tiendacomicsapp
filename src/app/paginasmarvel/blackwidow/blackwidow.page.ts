import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blackwidow',
  templateUrl: './blackwidow.page.html',
  styleUrls: ['./blackwidow.page.scss'],
})
export class BlackwidowPage implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  constructor() { }

  ngOnInit() {
  }

  addToCart() {
    // Lógica para agregar al carrito
    console.log(`Añadido al carrito: Cantidad ${this.quantity}`);
  }
}
