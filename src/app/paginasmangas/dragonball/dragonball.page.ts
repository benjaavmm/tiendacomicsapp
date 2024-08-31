import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dragonball',
  templateUrl: './dragonball.page.html',
  styleUrls: ['./dragonball.page.scss'],
})
export class DragonballPage implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  constructor() { }

  ngOnInit() {
  }

  addToCart() {
    // Lógica para agregar al carrito
    console.log(`Añadido al carrito: Cantidad ${this.quantity}`);
  }
}