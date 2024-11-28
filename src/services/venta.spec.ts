import { Venta } from './venta';

describe('Venta', () => {
  it('should create an instance', () => {
    const venta = new Venta(
      1, // id_venta
      '2024-11-28', // f_venta (formato de fecha como string)
      1, // id_usuario
      1000, // total
      1 // id_estado (opcional)
    );
    expect(venta).toBeTruthy();
  });
});
