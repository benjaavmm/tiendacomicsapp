import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertController, Platform } from '@ionic/angular';
import { Usuario } from './usuario';
import { Comic } from './comic'; 
import { CompraDetalle } from './compradetalle';

@Injectable({
  providedIn: 'root'
})
export class ServicebdService {
  private database!: SQLiteObject;
  private isDBReady = new BehaviorSubject<boolean>(false);
  public listaUsuarios = new BehaviorSubject<Usuario[]>([]);
  private currentUser = new BehaviorSubject<Usuario | null>(null);

  // Definiciones de tablas actualizadas
  private tablaRol = `
    CREATE TABLE IF NOT EXISTS rol (
      id_rol INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre_rol VARCHAR(50) NOT NULL
    );`;

  private tablaUsuario = `
    CREATE TABLE IF NOT EXISTS usuario (
      id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
      rut VARCHAR(12) NOT NULL UNIQUE,
      nombre VARCHAR(50) NOT NULL,
      apellidos VARCHAR(50) NOT NULL,
      foto_usuario BLOB,
      correo VARCHAR(100) NOT NULL UNIQUE,
      direccion VARCHAR(200) NOT NULL,
      telefono VARCHAR(20) NOT NULL,
      clave VARCHAR(100) NOT NULL,
      id_rol INTEGER,
      pregunta_seguridad VARCHAR(100) NOT NULL,
      respuesta_seguridad VARCHAR(100) NOT NULL,
      FOREIGN KEY (id_rol) REFERENCES rol (id_rol)
    );`;

  private tablaCategoria = `
    CREATE TABLE IF NOT EXISTS categoria (
      id_categoria INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre_categoria VARCHAR(50) NOT NULL
    );`;

  private tablaComics = `
    CREATE TABLE IF NOT EXISTS comics (
      id_comic INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre_comic VARCHAR(100) NOT NULL,
      precio NUMERIC NOT NULL,
      stock NUMERIC NOT NULL,
      descripcion TEXT,
      foto_comic VARCHAR(200),
      id_categoria INTEGER,
      link VARCHAR(200),
      FOREIGN KEY (id_categoria) REFERENCES categoria (id_categoria)
    );`;

  private tablaVenta = `
    CREATE TABLE IF NOT EXISTS venta (
      id_venta INTEGER PRIMARY KEY AUTOINCREMENT,
      f_venta DATE,
      id_usuario INTEGER,
      total NUMERIC,
      id_estado INTEGER DEFAULT 1,
      FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario)
    );`;

  private tablaDetallesVenta = `
    CREATE TABLE IF NOT EXISTS detalles_venta (
      id_detalle INTEGER PRIMARY KEY AUTOINCREMENT,
      id_venta INTEGER,
      id_comic INTEGER,
      cantidad INTEGER,
      FOREIGN KEY (id_venta) REFERENCES venta (id_venta),
      FOREIGN KEY (id_comic) REFERENCES comics (id_comic)
    );`;

  constructor(
    private sqlite: SQLite,
    private platform: Platform,
    private alertController: AlertController
  ) {
    this.initializeDatabase();
  }

  // Métodos de estado de la base de datos
  dbState() {
    return this.isDBReady.asObservable();
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.listaUsuarios.asObservable();
  }

  getCurrentUser(): Observable<Usuario | null> {
    return this.currentUser.asObservable();
  }

  getDatabase(): SQLiteObject {
    return this.database;
  }

  private async initializeDatabase() {
    try {
      await this.platform.ready();
      this.sqlite.create({
        name: 'tienda.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        this.setupDatabase();
      }).catch(e => this.presentAlert('Error', 'Error al crear la base de datos: ' + e));
    } catch (error) {
      this.presentAlert('Error', 'Error en la inicialización: ' + error);
    }
  }

  private async setupDatabase() {
    try {
      // Crear tablas
      await this.database.executeSql(this.tablaRol, []);
      await this.database.executeSql(this.tablaCategoria, []);
      await this.database.executeSql(this.tablaUsuario, []);
      await this.database.executeSql(this.tablaComics, []);
      await this.database.executeSql(this.tablaVenta, []);
      await this.database.executeSql(this.tablaDetallesVenta, []);
      
      // Insertar roles por defecto
      await this.database.executeSql(
        'INSERT OR IGNORE INTO rol (id_rol, nombre_rol) VALUES (?, ?)',
        [1, 'Usuario']
      );
      await this.database.executeSql(
        'INSERT OR IGNORE INTO rol (id_rol, nombre_rol) VALUES (?, ?)',
        [2, 'Admin']
      );

      // Insertar categorías por defecto
      await this.database.executeSql(
        'INSERT OR IGNORE INTO categoria (id_categoria, nombre_categoria) VALUES (?, ?)',
        [1, 'Marvel']
      );
      await this.database.executeSql(
        'INSERT OR IGNORE INTO categoria (id_categoria, nombre_categoria) VALUES (?, ?)',
        [2, 'Manga']
      );
      await this.database.executeSql(
        'INSERT OR IGNORE INTO categoria (id_categoria, nombre_categoria) VALUES (?, ?)',
        [3, 'DC']
      );
      
      this.isDBReady.next(true);
      await this.cargarUsuarios();
    } catch (error) {
      this.presentAlert('Error', 'Error en la configuración de la base de datos: ' + error);
    }
  }

  // Métodos de usuario
  async cargarUsuarios() {
    try {
      const res = await this.database.executeSql('SELECT * FROM usuario', []);
      const usuarios: Usuario[] = [];
      
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          usuarios.push({
            id_usuario: res.rows.item(i).id_usuario,
            rut: res.rows.item(i).rut,
            nombre: res.rows.item(i).nombre,
            apellidos: res.rows.item(i).apellidos,
            foto_usuario: res.rows.item(i).foto_usuario,
            correo: res.rows.item(i).correo,
            direccion: res.rows.item(i).direccion,
            telefono: res.rows.item(i).telefono,
            clave: res.rows.item(i).clave,
            id_rol: res.rows.item(i).id_rol,
            pregunta_seguridad: res.rows.item(i).pregunta_seguridad,
            respuesta_seguridad: res.rows.item(i).respuesta_seguridad
          });
        }
      }
      this.listaUsuarios.next(usuarios);
    } catch (error) {
      this.presentAlert('Error', 'Error al cargar usuarios: ' + error);
    }
  }

  // Métodos de cómics
  async insertarComics(comics: Comic[]) {
    try {
      for (const comic of comics) {
        const query = `
          INSERT OR IGNORE INTO comics (
            id_comic, nombre_comic, precio, stock, descripcion, 
            foto_comic, id_categoria, link
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        await this.database.executeSql(query, [
          comic.id_comic,
          comic.nombre_comic,
          comic.precio,
          comic.stock,
          comic.descripcion,
          comic.foto_comic,
          comic.id_categoria,
          comic.link
        ]);
      }
    } catch (error) {
      this.presentAlert('Error', 'Error al insertar cómics: ' + error);
    }
  }

  async getComicsByCategoria(id_categoria: number): Promise<Comic[]> {
    try {
      const query = 'SELECT * FROM comics WHERE id_categoria = ?';
      const result = await this.database.executeSql(query, [id_categoria]);
      const comics: Comic[] = [];

      for (let i = 0; i < result.rows.length; i++) {
        const item = result.rows.item(i);
        comics.push({
          id_comic: item.id_comic,
          quantity: 1,
          nombre_comic: item.nombre_comic,
          precio: item.precio,
          stock: item.stock,
          descripcion: item.descripcion,
          foto_comic: item.foto_comic,
          id_categoria: item.id_categoria,
          link: item.link
        });
      }

      return comics;
    } catch (error) {
      this.presentAlert('Error', 'Error al obtener cómics: ' + error);
      return [];
    }
  }

  // Métodos de venta actualizados
  async guardarVenta(f_venta: string, id_usuario: number, total: number, comics: Comic[], id_estado: number): Promise<void> {
    try {
      await this.database.executeSql(
        'INSERT INTO venta (f_venta, id_usuario, total) VALUES (?, ?, ?)',
        [f_venta, id_usuario, total]
      );

      const result = await this.database.executeSql('SELECT last_insert_rowid() as id', []);
      const id_venta = result.rows.item(0).id;

      for (const comic of comics) {
        if (comic.id_comic && comic.quantity) {
          await this.database.executeSql(
            'INSERT INTO detalles_venta (id_venta, id_comic, cantidad) VALUES (?, ?, ?)',
            [id_venta, comic.id_comic, comic.quantity]
          );

          // Actualizar stock
          await this.database.executeSql(
            'UPDATE comics SET stock = stock - ? WHERE id_comic = ?',
            [comic.quantity, comic.id_comic]
          );
        }
      }
    } catch (error) {
      console.error('Error al guardar la venta:', error);
      throw error;
    }
  }

  // Método para obtener el historial de compras actualizado
  getHistorialCompras(): Observable<CompraDetalle[]> {
    return new Observable(observer => {
      this.getCurrentUser().subscribe(async currentUser => {
        if (!currentUser?.id_usuario) {
          observer.error('No se encontró el usuario actual.');
          return;
        }

        try {
          const query = `
            SELECT 
              v.id_venta,
              v.f_venta,
              v.total,
              v.id_estado,
              dc.id_comic,
              dc.cantidad,
              c.nombre_comic,
              c.foto_comic,
              c.precio,
              c.id_categoria
            FROM venta v 
            LEFT JOIN detalles_venta dc ON v.id_venta = dc.id_venta 
            LEFT JOIN comics c ON dc.id_comic = c.id_comic
            WHERE v.id_usuario = ?
            ORDER BY v.f_venta DESC
          `;

          const result = await this.database.executeSql(query, [currentUser.id_usuario]);
          const comprasMap = new Map<number, CompraDetalle>();

          for (let i = 0; i < result.rows.length; i++) {
            const item = result.rows.item(i);
            if (!comprasMap.has(item.id_venta)) {
              comprasMap.set(item.id_venta, {
                id_venta: item.id_venta,
                fecha: new Date(item.f_venta).toLocaleDateString(),
                total: item.total,
                id_estado: item.id_estado,
                items: []
              });
            }

            const compra = comprasMap.get(item.id_venta);
            if (compra && item.id_comic) {
              compra.items.push({
                id_comic: item.id_comic,
                quantity: item.cantidad,
                nombre_comic: item.nombre_comic,
                precio: item.precio,
                stock: 0,
                descripcion: '',
                foto_comic: item.foto_comic,
                id_categoria: item.id_categoria,
                link: ''
              });
            }
          }

          observer.next(Array.from(comprasMap.values()));
          observer.complete();
        } catch (error) {
          observer.error('Error al obtener el historial de compras: ' + error);
        }
      });
    });
  }

   
  // Registrar nuevo usuario
  async registrarUsuario(usuario: Usuario): Promise<boolean> {
    try {
      const checkRUTQuery = 'SELECT * FROM usuario WHERE rut = ?';
      const checkRUTResult = await this.database.executeSql(checkRUTQuery, [usuario.rut]);
      if (checkRUTResult.rows.length > 0) {
        await this.presentAlert('Error', 'El RUT ya está registrado.');
        return false;
      }

      const checkEmailQuery = 'SELECT * FROM usuario WHERE correo = ?';
      const checkEmailResult = await this.database.executeSql(checkEmailQuery, [usuario.correo]);
      if (checkEmailResult.rows.length > 0) {
        await this.presentAlert('Error', 'El correo ya está registrado.');
        return false;
      }

      const query = `
        INSERT INTO usuario (
          rut, nombre, apellidos, foto_usuario, correo,
          direccion, telefono, clave, id_rol, pregunta_seguridad, respuesta_seguridad
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      await this.database.executeSql(query, [
        usuario.rut,
        usuario.nombre,
        usuario.apellidos,
        usuario.foto_usuario,
        usuario.correo,
        usuario.direccion,
        usuario.telefono,
        usuario.clave,
        usuario.id_rol || '1',
        usuario.pregunta_seguridad,
        usuario.respuesta_seguridad
      ]);
      
      await this.cargarUsuarios();
      return true;
    } catch (error: any) {
      let errorMessage = 'Error al registrar usuario: ';
      if (error.message) {
        errorMessage += error.message;
      } else {
        errorMessage += JSON.stringify(error);
      }
      this.presentAlert('Error', errorMessage);
      return false;
    }
  }

  // Login de usuario
  async login(correo: string, clave: string): Promise<Usuario | null> {
    try {
      const query = 'SELECT * FROM usuario WHERE correo = ? AND clave = ?';
      const result = await this.database.executeSql(query, [correo, clave]);
      
      if (result.rows.length > 0) {
        const usuario = result.rows.item(0);
        
        // Almacena el usuario actual sin la contraseña
        const { clave, ...usuarioSinClave } = usuario;
        this.currentUser.next(usuario); // Almacena el usuario actual
        localStorage.setItem('currentUser', JSON.stringify(usuarioSinClave)); // Guardar en localStorage
        return usuario;
      }
      return null;
    } catch (error) {
      this.presentAlert('Error', 'Error en el login: ' + error);
      return null;
    }
  }

  // Cerrar sesión
  logout() {
    this.currentUser.next(null); // Limpiar el usuario actual
    localStorage.removeItem('currentUser'); // Eliminar del localStorage
  }

  // Actualizar perfil de usuario
  async updateUserProfile(userId: number, nombre: string, telefono: string, direccion: string, fotoPerfil: string, apellidos: string): Promise<void> {
    try {
      const query = `
        UPDATE usuario
        SET nombre = ?, apellidos = ?, telefono = ?, direccion = ?, foto_usuario = ?
        WHERE id_usuario = ?
      `;
      await this.database.executeSql(query, [nombre, apellidos, telefono, direccion, fotoPerfil, userId]);
      const currentUser = await this.getUserById(userId);
      this.currentUser.next(currentUser);
    } catch (error) {
      this.presentAlert('Error', 'Error al actualizar el perfil: ' + error);
    }
  }

  // Método para obtener usuario por ID
  private async getUserById(userId: number): Promise<Usuario | null> {
    const query = 'SELECT * FROM usuario WHERE id_usuario = ?';
    const result = await this.database.executeSql(query, [userId]);
    return result.rows.length > 0 ? result.rows.item(0) : null;
  }

  // Validar la contraseña actual del usuario
  async validateCurrentPassword(userId: number, currentPassword: string): Promise<boolean> {
    const query = 'SELECT * FROM usuario WHERE id_usuario = ? AND clave = ?';
    const result = await this.database.executeSql(query, [userId, currentPassword]);
    return result.rows.length > 0;
  }

  // Actualizar la contraseña del usuario
  async updatePassword(userId: number, newPassword: string): Promise<void> {
    const query = 'UPDATE usuario SET clave = ? WHERE id_usuario = ?';
    await this.database.executeSql(query, [newPassword, userId]);
  }

  // Obtener todos los cómics
async getAllComics(): Promise<Comic[]> {
  try {
    const query = 'SELECT * FROM comics';
    const result = await this.database.executeSql(query, []);
    const comics: Comic[] = [];

    for (let i = 0; i < result.rows.length; i++) {
      const item = result.rows.item(i);
      comics.push({
        id_comic: item.id_comic,
        nombre_comic: item.nombre_comic,
        precio: item.precio,
        stock: item.stock,
        descripcion: item.descripcion,
        foto_comic: item.foto_comic,
        id_categoria: item.id_categoria,
        link: item.link,
        quantity: 1
      });
    }
    return comics;
  } catch (error) {
    this.presentAlert('Error', 'Error al obtener cómics: ' + error);
    return [];
  }
}

// Agregar un nuevo cómic
async addComic(comic: Comic): Promise<boolean> {
  try {
    const query = `
      INSERT INTO comics (
        nombre_comic, precio, stock, descripcion, 
        foto_comic, id_categoria, link
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    await this.database.executeSql(query, [
      comic.nombre_comic,
      comic.precio,
      comic.stock || 0,
      comic.descripcion,
      comic.foto_comic,
      comic.id_categoria,
      comic.link
    ]);
    return true;
  } catch (error) {
    this.presentAlert('Error', 'Error al agregar cómic: ' + error);
    return false;
  }
}

// Actualizar un cómic existente
async updateComic(comic: Comic): Promise<boolean> {
  try {
    const query = `
      UPDATE comics 
      SET nombre_comic = ?, precio = ?, stock = ?, descripcion = ?, 
          foto_comic = ?, id_categoria = ?, link = ?
      WHERE id_comic = ?
    `;
    
    await this.database.executeSql(query, [
      comic.nombre_comic,
      comic.precio,
      comic.stock,
      comic.descripcion,
      comic.foto_comic,
      comic.id_categoria,
      comic.link,
      comic.id_comic
    ]);
    return true;
  } catch (error) {
    this.presentAlert('Error', 'Error al actualizar cómic: ' + error);
    return false;
  }
}

// Eliminar un cómic
async deleteComic(id_comic: number): Promise<boolean> {
  try {
    const query = 'DELETE FROM comics WHERE id_comic = ?';
    await this.database.executeSql(query, [id_comic]);
    return true;
  } catch (error) {
    this.presentAlert('Error', 'Error al eliminar cómic: ' + error);
    return false;
  }
}

// Obtener historial de compras de todos los usuarios
getHistorialComprasAdmin(): Observable<CompraDetalle[]> {
  return new Observable(observer => {
    try {
      const query = `
        SELECT 
          v.id_venta,
          v.f_venta,
          v.total,
          v.id_estado,
          v.id_usuario,
          dc.id_comic,
          dc.cantidad,
          c.nombre_comic,
          c.foto_comic,
          c.precio
        FROM venta v 
        LEFT JOIN detalles_venta dc ON v.id_venta = dc.id_venta 
        LEFT JOIN comics c ON dc.id_comic = c.id_comic
        LEFT JOIN usuario u ON v.id_usuario = u.id_usuario
        ORDER BY v.f_venta DESC
      `;

      this.database.executeSql(query, []).then(result => {
        const comprasMap = new Map<number, CompraDetalle>();

        for (let i = 0; i < result.rows.length; i++) {
          const item = result.rows.item(i);
          if (!comprasMap.has(item.id_venta)) {
            comprasMap.set(item.id_venta, {
              id_venta: item.id_venta,
              fecha: new Date(item.f_venta).toLocaleDateString(),
              total: item.total,
              id_estado: item.id_estado,
              items: []
            });
          }

          const compra = comprasMap.get(item.id_venta);
          if (compra && item.id_comic) {
            compra.items.push({
              id_comic: item.id_comic,
              quantity: item.cantidad,
              nombre_comic: item.nombre_comic,
              precio: item.precio,
              stock: 0,
              descripcion: '',
              foto_comic: item.foto_comic,
              id_categoria: 0,
              link: ''
            });
          }
        }

        observer.next(Array.from(comprasMap.values()));
        observer.complete();
      });
    } catch (error) {
      observer.error('Error al obtener el historial de compras: ' + error);
    }
  });
}

  
  

  private async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}