import { Injectable } from '@angular/core';

// Clase para definir la estructura de un cómic
export class Comic {
  id_comic: string;
  quantity: number;
  nombre_comic: string; // Cambiado de 'title' a 'nombre_comic'
  precio: number; // Cambiado de 'price' a 'precio'
  stock: number;
  descripcion: string;
  foto_comic: string; // Cambiado de 'image' a 'foto_comic'
  id_categoria: string;
  link: string; // Nueva propiedad añadida

  constructor(
    id_comic: string,
    quantity: number,
    nombre_comic: string,
    precio: number,
    stock: number,
    descripcion: string,
    foto_comic: string,
    id_categoria: string,
    link: string // Añadido al constructor
  ) {
    this.id_comic = id_comic;
    this.quantity = quantity;
    this.nombre_comic = nombre_comic;
    this.precio = precio;
    this.stock = stock;
    this.descripcion = descripcion;
    this.foto_comic = foto_comic;
    this.id_categoria = id_categoria;
    this.link = link; // Asignación de la nueva propiedad
  }
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Comic[] = []; // Arreglo para almacenar los cómics en el carrito

  // Agregar un cómic al carrito
  addToCart(item: Comic) {
    const existingItem = this.cartItems.find(i => i.id_comic === item.id_comic);
    if (existingItem) {
      existingItem.quantity += item.quantity; // Aumentar cantidad si ya existe
    } else {
      this.cartItems.push(new Comic(
        item.id_comic,
        item.quantity,
        item.nombre_comic,
        item.precio,
        item.stock,
        item.descripcion,
        item.foto_comic,
        item.id_categoria,
        item.link // Asegúrate de incluir el link aquí
      )); // Agregar nuevo cómic al carrito
    }
  }

  // Obtener todos los cómics en el carrito
  getCartItems(): Comic[] {
    return this.cartItems;
  }

  // Eliminar un cómic del carrito
  removeItem(item: Comic) {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1); // Eliminar cómic
    }
  }

  // Limpiar el carrito
  clearCart() {
    this.cartItems = []; // Reiniciar carrito
  }

  // Obtener el total de cómics en el carrito
  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  // Obtener el costo total de los cómics en el carrito
  getTotalCost(): number {
    return this.cartItems.reduce((total, item) => total + (item.precio * item.quantity), 0);
  }

  // Verificar si el carrito está vacío
  isCartEmpty(): boolean {
    return this.cartItems.length === 0;
  }

  // Buscar un cómic por ID
  findItem(id_comic: string): Comic | undefined {
    return this.cartItems.find(item => item.id_comic === id_comic);
  }
}
