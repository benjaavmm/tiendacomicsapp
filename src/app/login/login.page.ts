import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { ServicebdService } from '../../services/servicebd.service';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

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
      // Vibrar al intentar iniciar sesión
      await Haptics.impact({ style: ImpactStyle.Medium });

      // Cerrar sesión si hay un usuario existente
      this.logout();

      // Simulación de validación para el administrador
      if (this.username === 'admin@admin.com' && this.password === 'Admin+123') {
        const alert = await this.alertCtrl.create({
          header: 'Bienvenido Administrador',
          message: '¡Inicio de sesión exitoso!',
          buttons: [{
            text: 'OK',
            handler: () => {
              this.navCtrl.navigateRoot('/admin');
              localStorage.setItem('currentUser', JSON.stringify({ correo: this.username, id_rol: 1 }));
            }
          }]
        });
        await alert.present();
      } else {
        try {
          // Validar usuario normal desde el servicio
          const usuario = await this.dbService.login(this.username, this.password);
          
          if (usuario) {
            const { clave, ...usuarioSinClave } = usuario;
            localStorage.setItem('currentUser', JSON.stringify(usuarioSinClave));

            if (Number(usuario.id_rol) === 2) {
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
              message: 'Correo o contraseña incorrectos',
              buttons: ['OK']
            });
            await alert.present();
          }
        } catch (error) {
          const alert = await this.alertCtrl.create({
            header: 'Error',
            message: 'Ocurrió un error al intentar iniciar sesión. Por favor, intenta nuevamente.',
            buttons: ['OK']
          });
          await alert.present();
        }
      }
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
