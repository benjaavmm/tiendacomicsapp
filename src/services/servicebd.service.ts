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

  // Nueva tabla estado para estados de venta/pago
  private tablaEstado = `
    CREATE TABLE IF NOT EXISTS estado (
      id_estado INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre_estado VARCHAR(50) NOT NULL
    );`;

  // Tabla venta extendida con campos PayPal
  private tablaVenta = `
  CREATE TABLE IF NOT EXISTS venta (
    id_venta INTEGER PRIMARY KEY AUTOINCREMENT,
    f_venta DATE,
    id_usuario INTEGER,
    total NUMERIC,
    id_estado INTEGER DEFAULT 1,
    paypal_order_id VARCHAR(100),
    paypal_status VARCHAR(50),
    paypal_payer_id VARCHAR(100),
    paypal_payment_time DATETIME,
    FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario),
    FOREIGN KEY (id_estado) REFERENCES estado (id_estado)
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
      await this.database.executeSql(this.tablaEstado, []);
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

      // Insertar estados por defecto para ventas
      await this.database.executeSql(
        'INSERT OR IGNORE INTO estado (id_estado, nombre_estado) VALUES (?, ?)',
        [1, 'Pendiente']
      );
      await this.database.executeSql(
        'INSERT OR IGNORE INTO estado (id_estado, nombre_estado) VALUES (?, ?)',
        [2, 'Completado']
      );
      await this.database.executeSql(
        'INSERT OR IGNORE INTO estado (id_estado, nombre_estado) VALUES (?, ?)',
        [3, 'Cancelado']
      );
      await this.database.executeSql(
        'INSERT OR IGNORE INTO estado (id_estado, nombre_estado) VALUES (?, ?)',
        [4, 'Fallido']
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

  // Métodos de venta actualizados para PayPal
  async guardarVenta(
    f_venta: string,
    id_usuario: number,
    total: number,
    comics: Comic[], // Asegurarse que estos cómics tienen 'quantity'
    id_estado: number,
    paypal_order_id?: string,
    paypal_status?: string,
    paypal_payer_id?: string,
    paypal_payment_time?: string
  ): Promise<number> {

    // Validaciones iniciales robustas
    if (!this.isDBReady.value || !this.database) {
      console.error("guardarVenta: La base de datos no está lista.");
      throw new Error('La base de datos no está inicializada.');
    }
    if (!id_usuario || typeof id_usuario !== 'number' || id_usuario <= 0) {
      console.error("guardarVenta: ID de usuario inválido:", id_usuario);
      throw new Error(`ID de usuario no válido: ${id_usuario}`);
    }
    if (!comics || comics.length === 0) {
      console.error("guardarVenta: No hay cómics para guardar.");
      throw new Error('No hay cómics para guardar en la venta.');
    }
    if (typeof total !== 'number' || total < 0) {
        console.warn(`guardarVenta: Total inválido (${total}), se establecerá a 0.`);
        total = 0; // O lanzar error si prefieres: throw new Error(`Total inválido: ${total}`);
    }
    if (typeof id_estado !== 'number') {
        console.error("guardarVenta: ID de estado inválido:", id_estado);
        throw new Error(`ID de estado no válido: ${id_estado}`);
    }

    console.log(`Iniciando guardarVenta: Usuario ${id_usuario}, Total ${total}, Estado ${id_estado}, Items ${comics.length}`);

    try {
      // Verificación de stock DENTRO de la transacción para consistencia
      // Iniciar transacción explícitamente
      console.log("Iniciando transacción SQL...");
      await this.database.executeSql('BEGIN TRANSACTION', []);
      console.log("Transacción iniciada.");

      // Verificar stock para cada item DENTRO de la transacción
      const stockErrores: string[] = [];
      for (const comic of comics) {
        const cantidadSolicitada = comic.quantity || 1; // Usar 1 si quantity no está definido
        if (!comic.id_comic || cantidadSolicitada <= 0) {
            stockErrores.push(`Item inválido detectado: ID ${comic.id_comic}, Cantidad ${cantidadSolicitada}`);
            continue; // Saltar este item inválido
        }

        const stockResult = await this.database.executeSql(
          'SELECT stock FROM comics WHERE id_comic = ?',
          [comic.id_comic]
        );

        if (stockResult.rows.length === 0) {
          stockErrores.push(`El cómic ${comic.nombre_comic || `ID ${comic.id_comic}`} no existe.`);
          continue;
        }

        const stockActual = stockResult.rows.item(0).stock;
        if (stockActual < cantidadSolicitada) {
          stockErrores.push(`Stock insuficiente para ${comic.nombre_comic || `ID ${comic.id_comic}`}. Disponible: ${stockActual}, Solicitado: ${cantidadSolicitada}`);
        }
      }

      // Si hubo errores de stock o items inválidos, hacer rollback y lanzar error
      if (stockErrores.length > 0) {
        console.error("Errores de stock detectados:", stockErrores);
        await this.database.executeSql('ROLLBACK', []);
        console.log("Transacción revertida debido a errores de stock.");
        throw new Error(stockErrores.join('; '));
      }
      console.log("Verificación de stock completada dentro de la transacción.");

      // Insertar la venta principal
      console.log("Insertando registro en tabla 'venta'...");
      const insertVentaResult = await this.database.executeSql(
        `INSERT INTO venta
          (f_venta, id_usuario, total, id_estado, paypal_order_id, paypal_status, paypal_payer_id, paypal_payment_time)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          f_venta, id_usuario, total, id_estado,
          paypal_order_id || null, paypal_status || null, paypal_payer_id || null, paypal_payment_time || null
        ]
      );

      const id_venta = insertVentaResult.insertId;
      if (!id_venta || id_venta <= 0) {
          throw new Error("No se pudo obtener un ID de venta válido después de la inserción.");
      }
      console.log(`Registro 'venta' insertado. ID: ${id_venta}`);

      // Insertar detalles y actualizar stock (si aplica)
      console.log("Insertando detalles de venta y actualizando stock...");
      for (const comic of comics) {
        const cantidad = comic.quantity || 1; // Usar la cantidad verificada
        if (!comic.id_comic || cantidad <= 0) continue; // Doble chequeo por si acaso

        // Insertar detalle
        await this.database.executeSql(
          'INSERT INTO detalles_venta (id_venta, id_comic, cantidad) VALUES (?, ?, ?)',
          [id_venta, comic.id_comic, cantidad]
        );
        console.log(` - Detalle insertado: Venta ${id_venta}, Comic ${comic.id_comic}, Cantidad ${cantidad}`);

        // Actualizar stock SOLO si el estado es 'Completado' (id_estado = 2)
        if (id_estado === 2) {
          const updateResult = await this.database.executeSql(
            // Asegurarse que la resta no deje stock negativo (aunque ya verificamos antes)
            'UPDATE comics SET stock = stock - ? WHERE id_comic = ? AND stock >= ?',
            [cantidad, comic.id_comic, cantidad]
          );

          // Verificar si la actualización afectó alguna fila
          if (updateResult.rowsAffected === 0) {
            // Esto es grave, indica inconsistencia o un problema concurrente
            console.error(`FALLO al actualizar stock para Comic ID ${comic.id_comic}. Cantidad: ${cantidad}. RowsAffected: 0.`);
            throw new Error(`No se pudo actualizar el stock para ${comic.nombre_comic || `ID ${comic.id_comic}`}. Puede que el stock haya cambiado.`);
          }
          console.log(` - Stock actualizado para Comic ${comic.id_comic}. Reducido en ${cantidad}.`);
        }
      }

      // Confirmar la transacción
      console.log("Confirmando transacción SQL...");
      await this.database.executeSql('COMMIT', []);
      console.log(`Transacción COMMIT exitosa para Venta ID: ${id_venta}`);

      this.comicsUpdated.next(true); // Notificar que el stock pudo haber cambiado
      return id_venta; // Retornar el ID de la venta creada

    } catch (error) {
      // Bloque CATCH MEJORADO
      console.error('ERROR durante la transacción de guardarVenta:', error);

      // Intentar hacer rollback si aún no se ha hecho
      try {
        console.log("Intentando ROLLBACK debido a error...");
        await this.database.executeSql('ROLLBACK', []);
        console.log("ROLLBACK ejecutado.");
      } catch (rollbackError) {
        console.error('Error CRÍTICO durante el ROLLBACK:', rollbackError);
        // Aquí la base de datos podría estar en un estado inconsistente.
        // Es importante loguear este error también.
      }

      // Formatear el mensaje de error para ser más útil
      let detailedErrorMessage = 'Error al guardar la venta: ';
      if (error instanceof Error) {
        detailedErrorMessage += error.message; // Mensaje estándar si es un objeto Error
      } else if (typeof error === 'string') {
        detailedErrorMessage += error; // Si el error es solo un string
      } else {
        // Intentar obtener más detalles del objeto de error (común en plugins Cordova)
        // Buscar códigos de error comunes de SQLite
        if (error && typeof error === 'object') {
            if ('message' in error && error.message) {
                 detailedErrorMessage += String(error.message);
            } else if ('code' in error && error.code) {
                detailedErrorMessage += `Código de error ${error.code}`;
                // Puedes añadir mapeos específicos de códigos de error SQLite si los conoces
                // ej. if (error.code === 6) detailedErrorMessage += ' (Tabla bloqueada)';
            } else {
                // Si no hay 'message' ni 'code', intentar serializar (con precaución)
                try {
                    detailedErrorMessage += JSON.stringify(error);
                } catch (stringifyError) {
                    detailedErrorMessage += 'Objeto de error no serializable.';
                }
            }
        } else {
            detailedErrorMessage += 'Error desconocido o no estándar.'; // Fallback final
        }
      }

      console.error("Mensaje de error formateado:", detailedErrorMessage);
      // Lanzar un nuevo error con el mensaje detallado
      throw new Error(detailedErrorMessage);
    }
  }


  // Método para actualizar estado y datos PayPal de una venta
  async actualizarEstadoPago(
    id_venta: number,
    paypal_status: string,
    paypal_order_id?: string,
    paypal_payer_id?: string,
    paypal_payment_time?: string
  ): Promise<void> {
    try {
      // Mapear estado PayPal a id_estado local
      let id_estado = 4; // Fallido por defecto
      switch (paypal_status.toUpperCase()) {
        case 'COMPLETED':
          id_estado = 2;
          break;
        case 'PENDING':
          id_estado = 1;
          break;
        case 'CANCELLED':
        case 'CANCELED':
          id_estado = 3;
          break;
      }

      const query = `
        UPDATE venta 
        SET 
          paypal_status = ?,
          id_estado = ?,
          paypal_order_id = ?,
          paypal_payer_id = ?,
          paypal_payment_time = ?
        WHERE id_venta = ?
      `;

      await this.database.executeSql(query, [
        paypal_status,
        id_estado,
        paypal_order_id || null,
        paypal_payer_id || null,
        paypal_payment_time || null,
        id_venta
      ]);

      // Si el pago se completó, actualizar stock (si no se hizo antes)
      if (id_estado === 2) {
        // Obtener detalles de venta
        const detalles = await this.database.executeSql(
          'SELECT id_comic, cantidad FROM detalles_venta WHERE id_venta = ?',
          [id_venta]
        );

        for (let i = 0; i < detalles.rows.length; i++) {
          const item = detalles.rows.item(i);
          await this.database.executeSql(
            'UPDATE comics SET stock = stock - ? WHERE id_comic = ? AND stock >= ?',
            [item.cantidad, item.id_comic, item.cantidad]
          );
        }
      }
    } catch (error) {
      throw error;
    }
  }

  // Método para verificar stock disponible
  async verificarStockDisponible(comicId: number): Promise<number> {
    const result = await this.database.executeSql(
      'SELECT stock FROM comics WHERE id_comic = ?',
      [comicId]
    );
    return result.rows.length > 0 ? result.rows.item(0).stock : 0;
  }

  // Método para actualizar stock (solo para admin)
  async actualizarStock(comicId: number, nuevoStock: number): Promise<boolean> {
    try {
      if (nuevoStock < 0 || !Number.isInteger(nuevoStock)) {
        throw new Error('El stock debe ser un número entero no negativo');
      }

      await this.database.executeSql(
        'UPDATE comics SET stock = ? WHERE id_comic = ?',
        [nuevoStock, comicId]
      );
      return true;
    } catch (error) {
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
                items: [],
                correo: ''
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

  // Agregar un método específico para el admin que muestre todos los cómics
  async getAllComicsAdmin(): Promise<Comic[]> {
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
  private logoutEvent = new BehaviorSubject<boolean>(false);

  getLogoutEvent(): Observable<boolean> {
    return this.logoutEvent.asObservable();
  }

  logout() {
    this.currentUser.next(null);
    localStorage.removeItem('currentUser');
    this.logoutEvent.next(true); // Emitir evento de logout
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
      // Solo traer cómics con stock > 0
      const query = 'SELECT * FROM comics WHERE stock > 0';
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

  // Eliminar un cómic (establecer stock a 0)
  async deleteComic(id_comic: number): Promise<boolean> {
    try {
      const query = 'UPDATE comics SET stock = 0 WHERE id_comic = ?';
      await this.database.executeSql(query, [id_comic]);
      
      this.comicsUpdated.next(true);
      return true;
    } catch (error) {
      await this.presentAlert('Error', 'Error al eliminar cómic: ' + error);
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
            u.correo,
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
                correo: item.correo,
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

  public comicsUpdated = new BehaviorSubject<boolean>(false);

  private async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
