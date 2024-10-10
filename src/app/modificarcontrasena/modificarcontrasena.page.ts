import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-modificarcontrasena',
  templateUrl: './modificarcontrasena.page.html',
  styleUrls: ['./modificarcontrasena.page.scss'],
})
export class ModificarContrasenaPage {
  currentPassword: string = ''; // Inicializado como cadena vacía
  newPassword: string = '';      // Inicializado como cadena vacía

  constructor(private alertController: AlertController) {}

  async changePassword() {
    // Aquí puedes agregar la lógica para cambiar la contraseña, como llamar a una API.

    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Contraseña cambiada correctamente.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
