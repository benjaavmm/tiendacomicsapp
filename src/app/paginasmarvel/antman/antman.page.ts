import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-antman',
  templateUrl: './antman.page.html',
  styleUrls: ['./antman.page.scss'],
})
export class AntmanPage implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  constructor() { }

  ngOnInit() {
  }

  addToCart() {
    // Lógica para agregar al carrito
    console.log(`Añadido al carrito: Cantidad ${this.quantity}`);
  }
}
