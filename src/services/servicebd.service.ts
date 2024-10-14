import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertController, Platform } from '@ionic/angular';
import { Usuario } from './usuario';
import { Comic } from './comic';
import { Venta } from './venta';


@Injectable({
  providedIn: 'root'
})

export class ServicebdService {
    //variable de conexión a la Base de Datos
    public database!: SQLiteObject;

    // Variables de creación de tablas
  tablaRol: string = "CREATE TABLE IF NOT EXISTS rol (id_rol INTEGER PRIMARY KEY AUTOINCREMENT, nombre_rol VARCHAR);";
  
  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario (id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, rut VARCHAR, nombre VARCHAR, apellidos VARCHAR, foto_usuario BLOB, correo VARCHAR, direccion VARCHAR, telefono VARCHAR, clave VARCHAR, id_rol INTEGER, FOREIGN KEY (id_rol) REFERENCES rol (id_rol));";

  tablaVenta: string = "CREATE TABLE IF NOT EXISTS venta (id_venta INTEGER PRIMARY KEY AUTOINCREMENT, f_venta DATE, id_usuario INTEGER, total NUMERIC, id_estado INTEGER, FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario), FOREIGN KEY (id_estado) REFERENCES estados (id_estado));";

  tablaEstados: string = "CREATE TABLE IF NOT EXISTS estados (id_estado INTEGER PRIMARY KEY AUTOINCREMENT, num_venta NUMERIC, carrito VARCHAR);";

  tablaComics: string = "CREATE TABLE IF NOT EXISTS comics (id_comic INTEGER PRIMARY KEY AUTOINCREMENT, nombre_comic VARCHAR, precio NUMERIC, stock NUMERIC, descripcion VARCHAR, foto_comic BLOB, id_categoria INTEGER, estatus VARCHAR, FOREIGN KEY (id_categoria) REFERENCES categoria (id_categoria));";

  tablaDetalle: string = "CREATE TABLE IF NOT EXISTS detalle (id_detalle INTEGER PRIMARY KEY AUTOINCREMENT, id_venta INTEGER, id_comic INTEGER, cantidad NUMERIC, subtotal NUMERIC, FOREIGN KEY (id_venta) REFERENCES venta (id_venta), FOREIGN KEY (id_comic) REFERENCES comics (id_comic));";

  tablaCategoria: string = "CREATE TABLE IF NOT EXISTS categoria (id_categoria INTEGER PRIMARY KEY AUTOINCREMENT, nombre_categoria VARCHAR);";

  tablaReseña: string = "CREATE TABLE IF NOT EXISTS reseña (id_reseña INTEGER PRIMARY KEY AUTOINCREMENT, descripcion_reseña VARCHAR, puntos NUMERIC, fecha_reseña DATE, id_usuario INTEGER, id_comic INTEGER, FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario), FOREIGN KEY (id_comic) REFERENCES comics (id_comic));";

  //variables de insert por defecto en la Base de Datos
  registroRol: string = "INSERT or IGNORE INTO tablaRol(id_rol, nombre_rol) VALUES (1, 'Usuario')";
  registroRol2: string = "INSERT or IGNORE INTO tablaRol(id_rol, nombre_rol) VALUES (2, 'Admin')";

 //variables para guardar los registros resultantes de un select
 listaRol = new BehaviorSubject([]);
 listaUsuario = new BehaviorSubject([]);
 listaVenta = new BehaviorSubject([]);
 listaEstados = new BehaviorSubject([]);
 listaComics = new BehaviorSubject([]);
 listaDetalle = new BehaviorSubject([]);
 listaCategoria = new BehaviorSubject([]);
 listaReseña = new BehaviorSubject([]);


 //variable para manipular el estado de la Base de Datos
 private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

 constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController) {
    this.crearBD();
   }

    //función para suscribirme al observable
   dbState(){
    return this.isDBReady.asObservable();
  }

  fetchUsuario(): Observable<Usuario[]> {
    return this.listaUsuario.asObservable();
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
        //modificar el observable del status de la base de datos
        this.isDBReady.next(true);
      }).catch(e=>{
        this.presentAlert("Creación de BD", "Error creando la BD: " + JSON.stringify(e));
      })
    })
  }

  async crearTablas() {
    try {
      //ejecutar la creacion de tablas
      await this.database.executeSql(this.tablaRol,[]);

      await this.database.executeSql(this.tablaUsuario,[]);
      
      await this.database.executeSql(this.tablaVenta,[]);
  
      await this.database.executeSql(this.tablaEstados,[]);

      await this.database.executeSql(this.tablaComics,[]);
    
      await this.database.executeSql(this.tablaDetalle,[]);
 
      await this.database.executeSql(this.tablaCategoria,[]);

      await this.database.executeSql(this.tablaReseña,[]);



      //ejecuto los registros

      // Ejecución de la inserción de roles
      await this.database.executeSql(this.registroRol, []);

      await this.database.executeSql(this.registroRol2, []);
    

      

      // Actualizar el estatus de la BD
    this.isDBReady.next(true);
    this.buscarUsuario();
  } catch (e) {
    // Capturar y mostrar el error en la creación de las tablas
    this.presentAlert("Error en Crear tablas", "Error: " + JSON.stringify(e));
  }
}

  buscarUsuario() {
    return this.database.executeSql('SELECT * FROM usuario', []).then(res => {
      //variable para almacenar la consulta
      let items: Usuario[] = [];
      //validar si existen registros
      if (res.rows.length > 0) {
        //procedo a recorrer y guardar
        for (var i = 0; i < res.rows.length; i++) {
          //agrego los datos a mi variable
          items.push({
            id_usuario: res.rows.item(i).id_usuario,
            rut: res.rows.item(i).rut,
            nombre: res.rows.item(i).nombre,
            apellidos: res.rows.item(i).apellidos,
            foto_usuario: res.rows.item(i).foto_usuario,
            direccion: res.rows.item(i).direccion,
            correo: res.rows.item(i).correo,
            telefono: res.rows.item(i).telefono,
            clave: res.rows.item(i).clave,
            id_rol: res.rows.item(i).id_rol
          })
        }
      }
      //actualizar mi observable
      this.listaUsuario.next(items as any);

    })
  }

  private async presentAlert(header: string, msj: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: msj,
      buttons: ['Aceptar']
    });
    await alert.present();
  }


  crearUsuario(rut: any,  nombre: any, apellido: any, foto_usuario: any, direccion: any, correo: any, telefono: any, clave: any, id_rol: any,) {
    return this.database.executeSql('INSERT INTO usuario(rut,nombre,apellido,foto_usuario,direccion,correo,telefono,clave,id_rol) VALUES (?,?,?,?,?,?,?,?,?)', [rut,nombre,apellido,foto_usuario,direccion,correo,telefono,clave,id_rol]).then(res => {
      this.buscarUsuario();
    })
  }


}   