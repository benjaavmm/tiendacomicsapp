import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attackontitan',
  templateUrl: './attackontitan.page.html',
  styleUrls: ['./attackontitan.page.scss'],
})
export class AttackontitanPage implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  constructor() { }

  ngOnInit() {
  }

  addToCart() {
    // Lógica para agregar al carrito
    console.log(`Añadido al carrito: Cantidad ${this.quantity}`);
  }
}
