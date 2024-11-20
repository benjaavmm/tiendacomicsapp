export interface Comic {
    id_comic: number;
    nombre_comic: string;
    precio: number;
    stock: number;
    descripcion: string;
    foto_comic: string;
    id_categoria: number;
    link: string;
    quantity: number;
  }
  
  export class ComicImpl implements Comic {
    id_comic: number;
    nombre_comic: string;
    precio: number;
    stock: number;
    descripcion: string;
    foto_comic: string;
    id_categoria: number;
    link: string;
    quantity: number;
  
    constructor(
      id_comic: number,
      quantity: number,
      nombre_comic: string,
      precio: number,
      stock: number,
      descripcion: string,
      foto_comic: string,
      id_categoria: number,
      link: string
    ) {
      this.id_comic = id_comic;
      this.quantity = quantity;
      this.nombre_comic = nombre_comic;
      this.precio = precio;
      this.stock = stock;
      this.descripcion = descripcion;
      this.foto_comic = foto_comic;
      this.id_categoria = id_categoria;
      this.link = link;
    }
  }