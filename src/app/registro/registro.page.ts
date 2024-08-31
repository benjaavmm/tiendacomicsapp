import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  // Inicializa las propiedades
  nombre: string = '';
  apellido: string = '';
  email: string = '';
  telefono: string = '';
  direccion: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';

  constructor(private alertCtrl: AlertController, private navCtrl: NavController) {}

  // Método onSubmit
  async onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.contrasena !== this.confirmarContrasena) {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'Las contraseñas no coinciden.',
          buttons: ['Aceptar']
        });
        await alert.present();
        return;
      }

      // Validación de la longitud de la contraseña
      if (this.contrasena.length < 8) {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'La contraseña debe tener al menos 8 caracteres.',
          buttons: ['Aceptar']
        });
        await alert.present();
        return;
      }

      // Validación del formato de email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para validar el email
      if (!emailPattern.test(this.email)) {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'Por favor, ingresa un correo electrónico válido.',
          buttons: ['Aceptar']
        });
        await alert.present();
        return;
      }

      // Validación de que el nombre no contenga números
      if (this.nombre.match(/\d/)) {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'El nombre no debe contener números.',
          buttons: ['Aceptar']
        });
        await alert.present();
        return;
      }

      // Si todo es correcto
      const alert = await this.alertCtrl.create({
        header: 'Registro Exitoso',
        message: 'Tu cuenta ha sido creada exitosamente.',
        buttons: [{
          text: 'Aceptar',
          handler: () => {
            this.navCtrl.navigateRoot('/login'); // Redirige a la página de login
          }
        }]
      });
      await alert.present();
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Por favor, completa todos los campos obligatorios.',
        buttons: ['Aceptar']
      });
      await alert.present();
    }
  }
}
