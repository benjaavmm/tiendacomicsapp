import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RecoveryService } from '../../services/recovery.service.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServicebdService } from '../../services/servicebd.service';
import { Usuario } from '../../services/usuario'; // Asegúrate de que esta importación sea correcta

@Component({
  selector: 'app-recuperaclave',
  templateUrl: './recuperaclave.page.html',
  styleUrls: ['./recuperaclave.page.scss'],
})
export class RecuperaclavePage {
  email: string = '';
  paso: number = 1;
  preguntaSeguridad: string = '';
  respuestaSeguridad: string = '';
  nuevaPassword: string = '';
  confirmarPassword: string = '';
  usuario: Usuario | null = null; // Variable para almacenar la información del usuario

  constructor(
    private recoveryService: RecoveryService,
    private alertController: AlertController,
    private router: Router,
    private servicebd: ServicebdService // Inyectar el servicio
  ) {}

  async onSubmit(form: NgForm) {
    if (!form.valid) return;

    switch (this.paso) {
      case 1:
        await this.verificarCorreo();
        break;
      case 2:
        await this.verificarPreguntaSeguridad();
        break;
      case 3:
        await this.cambiarPassword();
        break;
    }
  }

  private async verificarCorreo() {
    const { valid, preguntaSeguridad } = await this.recoveryService.verificarCorreo(this.email);
    if (valid) {
      this.preguntaSeguridad = preguntaSeguridad || '';
      this.paso = 2; // Avanza al paso 2
    } else {
      this.mostrarAlerta('Error', 'El correo no está registrado.');
    }
  }

  private async verificarPreguntaSeguridad() {
    const isCorrect = await this.recoveryService.verificarPreguntaSeguridad(this.email, this.respuestaSeguridad);
    if (isCorrect) {
      this.paso = 3; // Avanza al paso 3
    } else {
      this.mostrarAlerta('Error', 'Respuesta incorrecta.');
    }
  }

  private async cambiarPassword() {
    if (this.nuevaPassword !== this.confirmarPassword) {
      this.mostrarAlerta('Error', 'Las contraseñas no coinciden.');
      return;
    }

    // Validar la nueva contraseña
    if (!this.recoveryService.validarPassword(this.nuevaPassword)) {
      this.mostrarAlerta('Error', 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial.');
      return;
    }

    // Actualizar la contraseña
    if (await this.recoveryService.actualizarPassword(this.email, this.nuevaPassword)) {
      this.mostrarAlerta('Éxito', 'Contraseña actualizada correctamente.');
      this.router.navigate(['/login']);
    } else {
      this.mostrarAlerta('Error', 'No se pudo actualizar la contraseña.');
    }
  }

  private async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
