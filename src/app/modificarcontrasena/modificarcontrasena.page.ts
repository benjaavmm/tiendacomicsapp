import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-modificarcontrasena',
  templateUrl: './modificarcontrasena.page.html',
  styleUrls: ['./modificarcontrasena.page.scss'],
})
export class ModificarContrasenaPage {
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  newPasswordError: string = '';
  confirmPasswordError: string = '';

  constructor(private alertCtrl: AlertController) {}

  async changePassword() {
    this.newPasswordError = '';
    this.confirmPasswordError = '';

    if (!this.newPassword) {
      this.newPasswordError = 'La nueva contraseña es obligatoria.';
    } else if (!this.isPasswordValid(this.newPassword)) {
      this.newPasswordError = 'Debe tener al menos 8 caracteres y una letra mayúscula.';
    }

    if (this.newPassword !== this.confirmPassword) {
      this.confirmPasswordError = 'Las contraseñas no coinciden.';
    }

    if (!this.newPasswordError && !this.confirmPasswordError) {
      // Aquí puedes agregar la lógica para cambiar la contraseña, como llamar a una API.
      await this.showSuccessAlert();
    }
  }

  private isPasswordValid(password: string): boolean {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    return password.length >= minLength && hasUpperCase;
  }

  private async showSuccessAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Éxito',
      message: 'Contraseña cambiada correctamente.',
      buttons: ['OK']
    });
    await alert.present();
  }
}
