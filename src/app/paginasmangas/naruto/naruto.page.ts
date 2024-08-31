import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-naruto',
  templateUrl: './naruto.page.html',
  styleUrls: ['./naruto.page.scss'],
})
export class NarutoPage implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  constructor() { }

  ngOnInit() {
  }

  addToCart() {
    // Lógica para agregar al carrito
    console.log(`Añadido al carrito: Cantidad ${this.quantity}`);
  }
}