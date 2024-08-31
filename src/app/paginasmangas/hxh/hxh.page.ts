import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hxh',
  templateUrl: './hxh.page.html',
  styleUrls: ['./hxh.page.scss'],
})
export class HxhPage implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  constructor() { }

  ngOnInit() {
  }

  addToCart() {
    // Lógica para agregar al carrito
    console.log(`Añadido al carrito: Cantidad ${this.quantity}`);
  }
}
