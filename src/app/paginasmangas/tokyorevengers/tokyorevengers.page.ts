import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tokyorevengers',
  templateUrl: './tokyorevengers.page.html',
  styleUrls: ['./tokyorevengers.page.scss'],
})
export class TokyorevengersPage implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  constructor() { }

  ngOnInit() {
  }

  addToCart() {
    // Lógica para agregar al carrito
    console.log(`Añadido al carrito: Cantidad ${this.quantity}`);
  }
}

