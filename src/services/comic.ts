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
