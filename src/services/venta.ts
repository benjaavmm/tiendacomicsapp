export class Venta {
    id_venta: number; // Cambiado a number
    f_venta: string;
    id_usuario: number; // Cambiado a number
    total: number;
    id_estado?: number; // Cambiado a number

    constructor(
        id_venta: number,
        f_venta: string,
        id_usuario: number,
        total: number,
        id_estado?: number
    ) {
        this.id_venta = id_venta;
        this.f_venta = f_venta;
        this.id_usuario = id_usuario;
        this.total = total;
        this.id_estado = id_estado;
    }
}
