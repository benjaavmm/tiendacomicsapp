import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-secretwars',
  templateUrl: './secretwars.page.html',
  styleUrls: ['./secretwars.page.scss'],
})
export class SecretwarsPage implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  constructor() { }

  ngOnInit() {
  }

  addToCart() {
    // Lógica para agregar al carrito
    console.log(`Añadido al carrito: Cantidad ${this.quantity}`);
  }
}
