import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RecoveryService } from '../../services/recovery.service.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServicebdService } from '../../services/servicebd.service';
import { Usuario } from '../../services/usuario';

@Component({
  selector: 'app-recuperaclave',
  templateUrl: './recuperaclave.page.html',
  styleUrls: ['./recuperaclave.page.scss'],
})
export class RecuperaclavePage {
  email: string = '';
  paso: number = 1;
  preguntaSeleccionada: string = ''; // Nueva propiedad
  respuestaSeguridad: string = '';
  nuevaPassword: string = '';
  confirmarPassword: string = '';
  preguntasSeguridad: string[] = [
    '¿Cuál es el nombre de tu primera mascota?',
    '¿Cuál es tu color favorito?',
    '¿En qué ciudad naciste?',
    '¿Cuál es el nombre de tu madre?',
    '¿Cuál es tu comida favorita?'
  ];

  constructor(
    private recoveryService: RecoveryService,
    private alertController: AlertController,
    private router: Router,
    private servicebd: ServicebdService
  ) {}

  async onSubmit(form: NgForm) {
    if (!form.valid) return;

    switch (this.paso) {
      case 1:
        if (this.validarCamposPaso1()) {
          await this.verificarCorreo();
        }
        break;
      case 2:
        if (this.validarCamposPaso2()) {
          await this.verificarPreguntaSeguridad();
        }
        break;
      case 3:
        if (this.validarCamposPaso3()) {
          await this.cambiarPassword();
        }
        break;
    }
  }

  private validarCamposPaso1(): boolean {
    if (this.email.trim() === '') {
      this.mostrarAlerta('Error', 'El campo de correo electrónico no puede estar vacío.');
      return false;
    }
    return true;
  }

  private validarCamposPaso2(): boolean {
    if (this.preguntaSeleccionada.trim() === '') {
      this.mostrarAlerta('Error', 'Debes seleccionar una pregunta de seguridad.');
      return false;
    }
    if (this.respuestaSeguridad.trim() === '') {
      this.mostrarAlerta('Error', 'La respuesta de seguridad no puede estar vacía.');
      return false;
    }
    return true;
  }

  private validarCamposPaso3(): boolean {
    if (this.nuevaPassword.trim() === '') {
      this.mostrarAlerta('Error', 'El campo de nueva contraseña no puede estar vacío.');
      return false;
    }
    if (this.confirmarPassword.trim() === '') {
      this.mostrarAlerta('Error', 'El campo de confirmar contraseña no puede estar vacío.');
      return false;
    }
    return true;
  }

  private async verificarCorreo() {
    const { valid, preguntaSeguridad } = await this.recoveryService.verificarCorreo(this.email);
    if (valid) {
      this.paso = 2; // Avanza al paso 2
    } else {
      this.mostrarAlerta('Error', 'El correo no está registrado.');
    }
  }

  private async verificarPreguntaSeguridad() {
    const isCorrect = await this.recoveryService.verificarPreguntaSeguridad(this.email, this.preguntaSeleccionada, this.respuestaSeguridad);
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
