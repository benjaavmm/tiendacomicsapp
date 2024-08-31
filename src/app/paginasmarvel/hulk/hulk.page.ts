import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hulk',
  templateUrl: './hulk.page.html',
  styleUrls: ['./hulk.page.scss'],
})
export class HulkPage implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  constructor() { }

  ngOnInit() {
  }

  addToCart() {
    // Lógica para agregar al carrito
    console.log(`Añadido al carrito: Cantidad ${this.quantity}`);
  }
}

