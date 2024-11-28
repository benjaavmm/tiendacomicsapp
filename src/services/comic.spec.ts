import { ComicImpl } from './comic';

describe('Comic', () => {
  it('should create an instance', () => {
    const comic = new ComicImpl(
      1, // id_comic
      1, // quantity
      'Test Comic', // nombre_comic
      10.0, // precio
      100, // stock
      'Descripción del comic', // descripcion
      'link/a/la/foto.jpg', // foto_comic
      1, // id_categoria
      'http://link.com' // link
    );
    expect(comic).toBeTruthy();
  });
});
