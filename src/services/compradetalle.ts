

export interface CompraDetalle {
  fecha: string;
  total: number;
  id_venta: number;
  items: Comic[];
}

export class Comic {
    id_comic: string;
    quantity: number;
    nombre_comic: string; 
    precio: number; 
    stock: number;
    descripcion: string;
    foto_comic: string;
    id_categoria: string;
    link: string;

    constructor(
        id_comic: string,
        quantity: number,
        nombre_comic: string,
        precio: number,
        stock: number,
        descripcion: string,
        foto_comic: string,
        id_categoria: string,
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
