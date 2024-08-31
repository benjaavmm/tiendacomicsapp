import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jujutsukaisen',
  templateUrl: './jujutsukaisen.page.html',
  styleUrls: ['./jujutsukaisen.page.scss'],
})
export class JujutsukaisenPage implements OnInit {
  quantity: number = 1; // Define la propiedad quantity con un valor inicial

  constructor() { }

  ngOnInit() {
  }

  addToCart() {
    // Lógica para agregar al carrito
    console.log(`Añadido al carrito: Cantidad ${this.quantity}`);
  }
}

