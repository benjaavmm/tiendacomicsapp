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
      // Simulación de validación para el administrador
      if (this.username === 'admin@admin.com' && this.password === 'admin123') {
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
      } else {
        // Validar usuario normal desde el servicio
        const usuario = await this.dbService.login(this.username, this.password);
        
        if (usuario) {
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
}
