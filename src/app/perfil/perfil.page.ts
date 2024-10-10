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

  editProfile() {
    // Navegar a la página de modificar perfil
    this.router.navigate(['/modificarperfil']);
  }

  changePassword() {
    // Navegar a la página de modificar contraseña
    this.router.navigate(['/modificarcontrasena']);
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
