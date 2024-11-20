import { Comic } from './comic';

export interface CompraDetalle {
  id_venta: number;
  fecha: string;
  total: number;
  id_estado: number;
  items: Comic[];
}