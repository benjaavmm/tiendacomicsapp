import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from '../../services/servicebd.service';
import { Usuario } from '../../services/usuario';

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
  currentUserId: number | null = null;

  constructor(private alertCtrl: AlertController, private servicebd: ServicebdService) {
    this.servicebd.getCurrentUser().subscribe((usuario: Usuario | null) => {
      this.currentUserId = usuario ? Number(usuario.id_usuario) : null; // Obtener ID del usuario actual
    });
  }

  async changePassword() {
    this.newPasswordError = '';
    this.confirmPasswordError = '';

    // Validar nueva contraseña
    if (!this.newPassword) {
      this.newPasswordError = 'La nueva contraseña es obligatoria.';
    } else if (!this.isPasswordValid(this.newPassword)) {
      this.newPasswordError = 'Debe tener al menos 8 caracteres, una letra mayúscula y un caracter especial.';
    }

    // Validar confirmación de contraseña
    if (this.newPassword !== this.confirmPassword) {
      this.confirmPasswordError = 'Las contraseñas no coinciden.';
    }

    // Si no hay errores, proceder a cambiar la contraseña
    if (!this.newPasswordError && !this.confirmPasswordError && this.currentUserId !== null) {
      const isCurrentPasswordValid = await this.servicebd.validateCurrentPassword(this.currentUserId, this.currentPassword);
      if (!isCurrentPasswordValid) {
        this.newPasswordError = 'La contraseña actual es incorrecta.';
        return;
      }

      // Actualizar la contraseña
      await this.servicebd.updatePassword(this.currentUserId, this.newPassword);
      await this.showSuccessAlert();
    }
  }

  private isPasswordValid(password: string): boolean {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); // Verificar carácter especial
    return password.length >= minLength && hasUpperCase && hasNumber && hasSpecialChar; // Validar longitud, mayúscula, número y carácter especial
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
