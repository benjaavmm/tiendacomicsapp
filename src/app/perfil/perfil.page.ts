import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from '../../services/servicebd.service';
import { Usuario } from '../../services/usuario';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  user: Usuario | null = null;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private servicebd: ServicebdService
  ) { }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.servicebd.getCurrentUser().subscribe(usuario => {
      this.user = usuario;
    });
  }

  editProfile() {
    this.router.navigate(['/modificarperfil']);
  }

  changePassword() {
    this.router.navigate(['/modificarcontrasena']);
  }

  async logout() {
    this.servicebd.logout(); // Cerrar sesión en el servicio
    this.router.navigate(['/login']); // Redirigir a la página de inicio
  }

  viewPurchases() {
    this.router.navigate(['/historialcompras']); // Redirigir a la página de historial de compras
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
