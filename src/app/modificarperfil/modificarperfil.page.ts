import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-modificarperfil',
  templateUrl: './modificarperfil.page.html',
  styleUrls: ['./modificarperfil.page.scss'],
})
export class ModificarperfilPage {
  nombre: string = '';
  email: string = '';
  fotoPerfil: string = './assets/img/default-profile.png';

  constructor(private alertController: AlertController) {}

  changeProfilePicture() {
    console.log('Cambiar foto de perfil');
  }

  async onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    try {
      // Aquí podrías implementar la lógica para actualizar el perfil si fuera necesario.
      console.log('Perfil actualizado:', {
        nombre: this.nombre,
        email: this.email,
        fotoPerfil: this.fotoPerfil
      });

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
