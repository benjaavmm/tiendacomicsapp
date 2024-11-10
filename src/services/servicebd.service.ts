import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertController, Platform } from '@ionic/angular';
import { Usuario } from './usuario';
import { Comic } from './comic'; 

@Injectable({
  providedIn: 'root'
})
export class ServicebdService {
  private database!: SQLiteObject;
  private isDBReady = new BehaviorSubject<boolean>(false);
  public listaUsuarios = new BehaviorSubject<Usuario[]>([]);
  private currentUser = new BehaviorSubject<Usuario | null>(null);

  // Definiciones de tablas
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
      FOREIGN KEY (id_rol) REFERENCES rol (id_rol)
    );`;

  private tablaVenta = `
    CREATE TABLE IF NOT EXISTS venta (
      id_venta INTEGER PRIMARY KEY AUTOINCREMENT,
      f_venta DATE,
      id_usuario INTEGER,
      total NUMERIC,
      id_estado INTEGER,
      FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario),
      FOREIGN KEY (id_estado) REFERENCES estados (id_estado)
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

  private tablaEstados = `
    CREATE TABLE IF NOT EXISTS estados (
      id_estado INTEGER PRIMARY KEY AUTOINCREMENT,
      num_venta NUMERIC,
      carrito VARCHAR
    );`;

  private tablaComics = `
    CREATE TABLE IF NOT EXISTS comics (
      id_comic INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre_comic VARCHAR(100) NOT NULL,
      precio NUMERIC NOT NULL,
      stock NUMERIC NOT NULL,
      descripcion TEXT,
      foto_comic BLOB,
      id_categoria INTEGER,
      estatus VARCHAR(20),
      link VARCHAR(200), // Nueva propiedad añadida
      FOREIGN KEY (id_categoria) REFERENCES categoria (id_categoria)
    );`;

  constructor(
    private sqlite: SQLite,
    private platform: Platform,
    private alertController: AlertController
  ) {
    this.initializeDatabase();
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser.next(JSON.parse(storedUser));
    }
  }

  // Obtener estado de la base de datos
  dbState() {
    return this.isDBReady.asObservable();
  }

  // Obtener lista de usuarios
  getUsuarios(): Observable<Usuario[]> {
    return this.listaUsuarios.asObservable();
  }

  // Obtener usuario actual
  getCurrentUser(): Observable<Usuario | null> {
    return this.currentUser.asObservable();
  }

  private async initializeDatabase() {
    try {
      await this.platform.ready();
      this.sqlite.create({
        name: 'tienda.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
        this.database = db;
        this.setupDatabase();
      })
      .catch(e => this.presentAlert('Error', 'Error al crear la base de datos: ' + e));
    } catch (error) {
      this.presentAlert('Error', 'Error en la inicialización: ' + error);
    }
  }

  private async setupDatabase() {
    try {
      // Crear tablas
      await this.database.executeSql(this.tablaRol, []);
      await this.database.executeSql(this.tablaUsuario, []);
      await this.database.executeSql(this.tablaVenta, []);
      await this.database.executeSql(this.tablaDetallesVenta, []); // Nueva tabla
      await this.database.executeSql(this.tablaEstados, []);
      await this.database.executeSql(this.tablaComics, []);
      
      // Insertar roles por defecto
      await this.database.executeSql(
        'INSERT OR IGNORE INTO rol (id_rol, nombre_rol) VALUES (?, ?)',
        [1, 'Usuario']
      );
      await this.database.executeSql(
        'INSERT OR IGNORE INTO rol (id_rol, nombre_rol) VALUES (?, ?)',
        [2, 'Admin']
      );
      
      this.isDBReady.next(true);
      await this.cargarUsuarios();
    } catch (error) {
      this.presentAlert('Error', 'Error en la configuración de la base de datos: ' + error);
    }
  }

  // Cargar usuarios desde la base de datos
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
            id_rol: res.rows.item(i).id_rol
          });
        }
      }
      this.listaUsuarios.next(usuarios);
    } catch (error) {
      this.presentAlert('Error', 'Error al cargar usuarios: ' + error);
    }
  }

  // Registrar nuevo usuario
  async registrarUsuario(usuario: Usuario): Promise<boolean> {
    try {
      // Verificar si el RUT ya existe
      const checkRUTQuery = 'SELECT * FROM usuario WHERE rut = ?';
      const checkRUTResult = await this.database.executeSql(checkRUTQuery, [usuario.rut]);
      if (checkRUTResult.rows.length > 0) {
        await this.presentAlert('Error', 'El RUT ya está registrado.');
        return false;
      }

      // Verificar si el correo ya existe
      const checkEmailQuery = 'SELECT * FROM usuario WHERE correo = ?';
      const checkEmailResult = await this.database.executeSql(checkEmailQuery, [usuario.correo]);
      if (checkEmailResult.rows.length > 0) {
        await this.presentAlert('Error', 'El correo ya está registrado.');
        return false;
      }

      const query = `
        INSERT INTO usuario (
          rut, nombre, apellidos, foto_usuario, correo,
          direccion, telefono, clave, id_rol
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        usuario.id_rol || '1'
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
        this.currentUser.next(usuario); // Almacena el usuario actual
        localStorage.setItem('currentUser', JSON.stringify(usuario)); // Guardar en localStorage
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
      // Actualizar el usuario actual en el BehaviorSubject
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
  
  // Método para guardar una venta y sus detalles
  async guardarVenta(f_venta: string, id_usuario: number, total: number, comics: Comic[], id_estado: number = 1): Promise<void> {
    await this.database.executeSql(
      'INSERT INTO venta (f_venta, id_usuario, total, id_estado) VALUES (?, ?, ?, ?)',
      [f_venta, id_usuario, total, id_estado]
    );

    const id_venta = await this.database.executeSql('SELECT last_insert_rowid()', []).then(res => res.rows.item(0)['last_insert_rowid()']);

    for (const comic of comics) {
      await this.database.executeSql(
        'INSERT INTO detalles_venta (id_venta, id_comic, cantidad) VALUES (?, ?, ?)',
        [id_venta, comic.id_comic, comic.quantity]
      );
    }
  }

  // Obtener historial de compras
  getHistorialCompras(): Observable<any[]> {
    return new Observable(observer => {
      this.getCurrentUser().subscribe(async currentUser => {
        const userId = currentUser?.id_usuario;

        if (userId) {
          const query = `
            SELECT v.*, dc.id_comic, dc.cantidad 
            FROM venta v 
            LEFT JOIN detalles_venta dc ON v.id_venta = dc.id_venta 
            WHERE v.id_usuario = ?`;
          try {
            const result = await this.database.executeSql(query, [userId]);
            const compras = [];

            for (let i = 0; i < result.rows.length; i++) {
              compras.push(result.rows.item(i));
            }

            observer.next(compras);
            observer.complete();
          } catch (error) {
            observer.error('Error al obtener el historial de compras: ' + error);
          }
        } else {
          observer.error('No se encontró el usuario actual.');
        }
      });
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
