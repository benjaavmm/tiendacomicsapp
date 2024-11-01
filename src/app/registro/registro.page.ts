import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { ServicebdService } from '../../services/servicebd.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  rut: string = '';
  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  telefono: string = '';
  direccion: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';
  foto_usuario: any = '';
  id_rol: string = '1';
  fotoIngresada: boolean = false;

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private dbService: ServicebdService,
    private toastController: ToastController
  ) {}

  async onSubmit(form: NgForm) {
    if (form.valid) {
      // Validar que las contraseñas coincidan
      if (this.contrasena !== this.confirmarContrasena) {
        await this.presentAlert('Error', 'Las contraseñas no coinciden');
        return;
      }

      // Eliminar espacios en blanco
      this.contrasena = this.contrasena.trim();

      // Validar formato de contraseña
      const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
      if (!passwordPattern.test(this.contrasena)) {
        await this.presentAlert('Error', 'La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.');
        return;
      }

      // Validar formato de correo electrónico
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.correo)) {
        await this.presentAlert('Error', 'Por favor, ingresa un correo electrónico válido.');
        return;
      }

      // Verificar que el nombre no contenga números
      if (/\d/.test(this.nombre)) {
        await this.presentAlert('Error', 'El nombre no debe contener números.');
        return;
      }

      // Verificar que el apellido no contenga números
      if (/\d/.test(this.apellido)) {
        await this.presentAlert('Error', 'El apellido no debe contener números.');
        return;
      }

      // Validar formato de teléfono
      const phonePattern = /^\+?[0-9\s]+$/;
      if (!phonePattern.test(this.telefono)) {
        await this.presentAlert('Error', 'El teléfono solo puede contener números y el símbolo +.');
        return;
      }

      // Crear objeto de usuario
      const usuario = {
        id_usuario: '',
        rut: this.rut,
        nombre: this.nombre,
        apellidos: this.apellido,
        foto_usuario: this.foto_usuario,
        correo: this.correo,
        direccion: this.direccion,
        telefono: this.telefono,
        clave: this.contrasena,
        id_rol: this.id_rol
      };

      // Registrar usuario
      const registroExitoso = await this.dbService.registrarUsuario(usuario);

      if (registroExitoso) {
        const alert = await this.alertCtrl.create({
          header: 'Éxito',
          message: 'Usuario registrado correctamente',
          buttons: [{
            text: 'OK',
            handler: () => {
              this.navCtrl.navigateRoot('/login');
            }
          }]
        });
        await alert.present();
      }
    } else {
      await this.presentAlert('Error', 'Por favor, completa todos los campos obligatorios.');
    }
  }

  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });

      this.foto_usuario = image.dataUrl;
      this.fotoIngresada = true;
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'Error al tomar la foto. Intenta nuevamente.',
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.foto_usuario = e.target.result;
        this.fotoIngresada = true;
      };
      reader.readAsDataURL(file);
    }
  }

  private async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
