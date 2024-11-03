import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from '../../services/servicebd.service';
import { Usuario } from '../../services/usuario';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-modificarperfil',
  templateUrl: './modificarperfil.page.html',
  styleUrls: ['./modificarperfil.page.scss'],
})
export class ModificarperfilPage implements OnInit {
  nombre: string = '';
  telefono: string = '';
  direccion: string = '';
  fotoPerfil: string = './assets/img/default-profile.png'; // Ruta por defecto
  userId: number | null = null;

  constructor(private alertController: AlertController, private dbService: ServicebdService) {}

  ngOnInit() {
    this.dbService.getCurrentUser().subscribe((usuario: Usuario | null) => {
      if (usuario) {
        this.nombre = usuario.nombre + ' ' + usuario.apellidos;
        this.telefono = usuario.telefono || '';
        this.direccion = usuario.direccion || '';
        this.fotoPerfil = usuario.foto_usuario || this.fotoPerfil; // Cargar foto de usuario
        this.userId = Number(usuario.id_usuario); // Convertir a number
      }
    });
  }

  async changeProfilePicture() {
    const alert = await this.alertController.create({
      header: 'Cambiar Foto de Perfil',
      message: '¿Cómo deseas cambiar tu foto de perfil?',
      buttons: [
        {
          text: 'Tomar Foto',
          handler: () => {
            this.takePicture(CameraSource.Camera);
          }
        },
        {
          text: 'Desde Galería',
          handler: () => {
            this.takePicture(CameraSource.Photos);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }

  async takePicture(source: CameraSource) {
    const image = await Camera.getPhoto({
      quality: 100,
      source: source,
      resultType: CameraResultType.Base64
    });

    this.fotoPerfil = 'data:image/jpeg;base64,' + image.base64String; // Convertir a base64
  }

  async onSubmit(form: NgForm) {
    if (form.invalid || this.userId === null) {
      return;
    }

    const [nombre, ...apellidos] = this.nombre.split(' ');
    const apellidoCompleto = apellidos.join(' '); // Unir el resto como apellido

    try {
      await this.dbService.updateUserProfile(this.userId, nombre, this.telefono, this.direccion, this.fotoPerfil, apellidoCompleto);
      
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Perfil actualizado correctamente.',
        buttons: ['OK']
      });
      await alert.present();
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Hubo un problema al actualizar el perfil. Inténtalo de nuevo.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
