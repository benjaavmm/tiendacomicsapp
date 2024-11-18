import { Injectable } from '@angular/core';
import { ServicebdService } from './servicebd.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class RecoveryService {
  constructor(
    private dbService: ServicebdService,
    private alertController: AlertController
  ) {}

  async verificarCorreo(correo: string): Promise<{ valid: boolean; preguntaSeguridad?: string }> {
    try {
      const query = 'SELECT * FROM usuario WHERE correo = ?';
      const result = await this.dbService.getDatabase().executeSql(query, [correo]);
      
      if (result.rows.length === 0) {
        await this.presentAlert('Error', 'El correo no está registrado.');
        return { valid: false };
      }

      const preguntaSeguridad = result.rows.item(0).pregunta_seguridad;
      return { valid: true, preguntaSeguridad };
    } catch (error) {
      console.error('Error al verificar correo:', error);
      await this.presentAlert('Error', 'Ocurrió un error al verificar el correo.');
      return { valid: false };
    }
  }

  async verificarPreguntaSeguridad(correo: string, respuesta: string): Promise<boolean> {
    try {
      const query = 'SELECT * FROM usuario WHERE correo = ?';
      const result = await this.dbService.getDatabase().executeSql(query, [correo]);
      
      if (result.rows.length === 0) {
        await this.presentAlert('Error', 'El correo no está registrado.');
        return false;
      }

      const respuestaGuardada = result.rows.item(0).respuesta_seguridad;

      // Comparar ambas respuestas en minúsculas
      if (respuestaGuardada.toLowerCase() !== respuesta.toLowerCase()) {
        await this.presentAlert('Error', 'Respuesta de seguridad incorrecta.');
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error al verificar pregunta de seguridad:', error);
      await this.presentAlert('Error', 'Ocurrió un error al verificar la pregunta de seguridad.');
      return false;
    }
  }

  async actualizarPassword(correo: string, nuevaPassword: string): Promise<boolean> {
    if (!this.validarPassword(nuevaPassword)) {
      await this.presentAlert('Error', 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial.');
      return false;
    }

    try {
      const query = 'SELECT * FROM usuario WHERE correo = ?';
      const result = await this.dbService.getDatabase().executeSql(query, [correo]);

      if (result.rows.length === 0) {
        await this.presentAlert('Error', 'El correo no está registrado.');
        return false;
      }

      const userId = result.rows.item(0).id_usuario;
      await this.dbService.updatePassword(userId, nuevaPassword);
      await this.presentAlert('Éxito', 'Contraseña actualizada correctamente.');
      return true;
    } catch (error) {
      console.error('Error al actualizar contraseña:', error);
      await this.presentAlert('Error', 'Ocurrió un error al actualizar la contraseña.');
      return false;
    }
  }

  public validarPassword(password: string): boolean {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&+*(),.?":{}|<>]/.test(password);
    return password.length >= minLength && hasUpperCase && hasSpecialChar;
  }

  private async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
