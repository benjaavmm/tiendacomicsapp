import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ironman',
  templateUrl: './ironman.page.html',
  styleUrls: ['./ironman.page.scss'],
})
export class IronmanPage implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  constructor() { }

  ngOnInit() {
  }

  addToCart() {
    // Lógica para agregar al carrito
    console.log(`Añadido al carrito: Cantidad ${this.quantity}`);
  }
}

