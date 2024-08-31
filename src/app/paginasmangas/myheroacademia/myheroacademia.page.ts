import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myheroacademia',
  templateUrl: './myheroacademia.page.html',
  styleUrls: ['./myheroacademia.page.scss'],
})
export class MyheroacademiaPage implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  constructor() { }

  ngOnInit() {
  }

  addToCart() {
    // Lógica para agregar al carrito
    console.log(`Añadido al carrito: Cantidad ${this.quantity}`);
  }
}