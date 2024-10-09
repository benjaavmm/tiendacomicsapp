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
      // Validación de que las contraseñas coincidan
      if (this.contrasena !== this.confirmarContrasena) {
        await this.presentAlert('Error', 'Las contraseñas no coinciden.');
        return;
      }

      // Validación de la contraseña: al menos 8 caracteres, una mayúscula y un número
      const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!passwordPattern.test(this.contrasena)) {
        await this.presentAlert('Error', 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.');
        return;
      }

      // Validación del formato de email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.email)) {
        await this.presentAlert('Error', 'Por favor, ingresa un correo electrónico válido.');
        return;
      }

      // Validación de que el nombre no contenga números
      if (/\d/.test(this.nombre)) {
        await this.presentAlert('Error', 'El nombre no debe contener números.');
        return;
      }

      // Validación de que el apellido no contenga números
      if (/\d/.test(this.apellido)) {
        await this.presentAlert('Error', 'El apellido no debe contener números.');
        return;
      }

      // Validación del formato del teléfono
      const phonePattern = /^\+?[0-9\s]+$/;
      if (!phonePattern.test(this.telefono)) {
        await this.presentAlert('Error', 'El teléfono solo puede contener números.');
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
      await this.presentAlert('Error', 'Por favor, completa todos los campos obligatorios.');
    }
  }

  // Método para presentar alertas
  private async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }
}
