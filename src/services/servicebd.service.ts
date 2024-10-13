import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertController, Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class ServicebdService {
    //variable de conexión a la Base de Datos
    public database!: SQLiteObject;

    // Variables de creación de tablas
  tablaRol: string = "CREATE TABLE IF NOT EXISTS rol (id_rol INTEGER PRIMARY KEY AUTOINCREMENT, nombre_rol VARCHAR);";
  
  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario (id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, rut VARCHAR, nombre VARCHAR, apellidos VARCHAR, foto_usuario BLOB, correo VARCHAR, clave VARCHAR, id_rol INTEGER, FOREIGN KEY (id_rol) REFERENCES rol (id_rol));";

  tablaVenta: string = "CREATE TABLE IF NOT EXISTS venta (id_venta INTEGER PRIMARY KEY AUTOINCREMENT, f_venta DATE, id_usuario INTEGER, total NUMERIC, id_estado INTEGER, FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario), FOREIGN KEY (id_estado) REFERENCES estados (id_estado));";

  tablaEstados: string = "CREATE TABLE IF NOT EXISTS estados (id_estado INTEGER PRIMARY KEY AUTOINCREMENT, num_venta NUMERIC, carito VARCHAR);";

  tablaComics: string = "CREATE TABLE IF NOT EXISTS comics (id_comic INTEGER PRIMARY KEY AUTOINCREMENT, nombre_comic VARCHAR, precio NUMERIC, stock NUMERIC, descripcion VARCHAR, foto_comic BLOB, id_categoria INTEGER, estatus VARCHAR, FOREIGN KEY (id_categoria) REFERENCES categoria (id_categoria));";

  tablaDetalle: string = "CREATE TABLE IF NOT EXISTS detalle (id_detalle INTEGER PRIMARY KEY AUTOINCREMENT, id_venta INTEGER, id_comic INTEGER, cantidad NUMERIC, subtotal NUMERIC, FOREIGN KEY (id_venta) REFERENCES venta (id_venta), FOREIGN KEY (id_comic) REFERENCES comics (id_comic));";

  tablaCategoria: string = "CREATE TABLE IF NOT EXISTS categoria (id_categoria INTEGER PRIMARY KEY AUTOINCREMENT, nombre_categoria VARCHAR);";

  tablaReseña: string = "CREATE TABLE IF NOT EXISTS reseña (id_reseña INTEGER PRIMARY KEY AUTOINCREMENT, descripcion_reseña VARCHAR, puntos NUMERIC, fecha_reseña DATE, id_usuario INTEGER, id_comic INTEGER, FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario), FOREIGN KEY (id_comic) REFERENCES comics (id_comic));";

  //variables de insert por defecto en la Base de Datos
  registroRol: string = "INSERT or IGNORE INTO tablaRol(id_rol, nombre_rol) VALUES (1, 'Usuario')";
  registroRol2: string = "INSERT or IGNORE INTO tablaRol(id_rol, nombre_rol) VALUES (2, 'Admin')";

 //variables para guardar los registros resultantes de un select
 listadoRol = new BehaviorSubject([]);
 listadoUsuario = new BehaviorSubject([]);
 listadoVenta = new BehaviorSubject([]);
 listadoEstados = new BehaviorSubject([]);
 listadoComics = new BehaviorSubject([]);
 listadoDetalle = new BehaviorSubject([]);
 listadoCategoria = new BehaviorSubject([]);
 listadoReseña = new BehaviorSubject([]);


 //variable para manipular el estado de la Base de Datos
 private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

 constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController) {
    this.crearBD();
   }

   dbState(){
    return this.isDBReady.asObservable();
  }

  crearBD(){
    //verificar la plataforma
    this.platform.ready().then(()=>{
      //procedemos a crear la Base de Datos
      this.sqlite.create({
        name: 'tienda.db',
        location:'default'
      }).then((db: SQLiteObject)=>{
        //capturar y guardar la conexión a la Base de Datos
        this.database = db;
        //llamar a la función de creación de tablas
        this.crearTablas();
        this.consultarNoticias();
        //modificar el observable del status de la base de datos
        this.isDBReady.next(true);
      }).catch(e=>{
        this.presentAlert("Creación de BD", "Error creando la BD: " + JSON.stringify(e));
      })
    })
  }
}   