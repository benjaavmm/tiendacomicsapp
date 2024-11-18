import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { ServicebdService } from '../../services/servicebd.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private dbService: ServicebdService
  ) {}

  async onSubmit(form: NgForm) {
    if (form.valid) {
      // Verificar si hay un usuario en sesión
      const existingUserJson = localStorage.getItem('currentUser');
      let existingUser: any = existingUserJson ? JSON.parse(existingUserJson) : null;

      // Si hay un usuario en sesión y es el mismo que intenta iniciar sesión
      if (existingUser && existingUser.correo === this.username) {
        const alert = await this.alertCtrl.create({
          header: 'Información',
          message: 'Ya tienes una sesión abierta con esta cuenta.',
          buttons: ['OK']
        });
        await alert.present();
        return; // Salir del método
      }

      // Si hay un usuario diferente, cerrar la sesión
      if (existingUser) {
        this.logout(); // Cerrar sesión del usuario anterior
      }

      // Simulación de validación para el administrador
      if (this.username === 'admin@admin.com' && this.password === 'Admin+123') {
        const alert = await this.alertCtrl.create({
          header: 'Bienvenido Administrador',
          message: '¡Inicio de sesión exitoso!',
          buttons: [{
            text: 'OK',
            handler: () => {
              this.navCtrl.navigateRoot('/admin');
              localStorage.setItem('currentUser', JSON.stringify({ correo: this.username, id_rol: 1 })); // Guardar usuario
            }
          }]
        });
        await alert.present();
      } else {
        // Validar usuario normal desde el servicio
        const usuario = await this.dbService.login(this.username, this.password);
        
        if (usuario) {
          const { clave, ...usuarioSinClave } = usuario; // Eliminar la clave del objeto
          localStorage.setItem('currentUser', JSON.stringify(usuarioSinClave)); // Guardar en localStorage

          if (Number(usuario.id_rol) === 2) { // Admin
            const alert = await this.alertCtrl.create({
              header: 'Bienvenido Administrador',
              message: '¡Inicio de sesión exitoso!',
              buttons: [{
                text: 'OK',
                handler: () => {
                  this.navCtrl.navigateRoot('/admin');
                }
              }]
            });
            await alert.present();
          } else { // Usuario normal
            const alert = await this.alertCtrl.create({
              header: 'Bienvenido',
              message: '¡Inicio de sesión exitoso!',
              buttons: [{
                text: 'OK',
                handler: () => {
                  this.navCtrl.navigateRoot('/home');
                }
              }]
            });
            await alert.present();
          }
        } else {
          const alert = await this.alertCtrl.create({
            header: 'Error',
            message: 'Usuario o contraseña incorrectos',
            buttons: ['OK']
          });
          await alert.present();
        }
      }
    }
  }

  logout() {
    localStorage.removeItem('currentUser'); // Limpiar el localStorage
    
  }
}
