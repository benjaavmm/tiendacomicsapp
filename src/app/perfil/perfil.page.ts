import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {

  user = {
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    role: 'Usuario',
    profileImage: ''
  };

  constructor(private router: Router, private alertController: AlertController) { }

  async editProfile() {
    const alert = await this.alertController.create({
      header: 'Modificar Perfil',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre',
          value: this.user.name
        },
        {
          name: 'email',
          type: 'email',
          placeholder: 'Correo Electrónico',
          value: this.user.email
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: (data) => {
            this.user.name = data.name;
            this.user.email = data.email;
            this.presentAlert('Perfil modificado', 'Tu perfil ha sido actualizado con éxito.');
          }
        }
      ]
    });

    await alert.present();
  }

  async changePassword() {
    const alert = await this.alertController.create({
      header: 'Cambiar Contraseña',
      inputs: [
        {
          name: 'currentPassword',
          type: 'password',
          placeholder: 'Contraseña Actual'
        },
        {
          name: 'newPassword',
          type: 'password',
          placeholder: 'Nueva Contraseña'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: (data) => {
            if (data.currentPassword === 'passwordActual' && data.newPassword) {
              this.presentAlert('Contraseña modificada', 'Tu contraseña ha sido cambiada con éxito.');
            } else {
              this.presentAlert('Error', 'La contraseña actual es incorrecta.');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
