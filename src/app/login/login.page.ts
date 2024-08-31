import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular'; 
import { AlertController } from '@ionic/angular'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  // Inicializa las propiedades
  username: string = '';
  password: string = '';

  // Simulación de un usuario
  private users = [
    { username: 'benja@gmail.com', password: '12345678' }, // Usuario válido
    { username: 'fefito@gmail.com', password: '12345678' }, // Otro usuario válido
    { username: 'admin@admin.com', password: 'admin123' }, // Usuario administrador
  ];

  constructor(private navCtrl: NavController, private alertCtrl: AlertController) {}

  // Método onSubmit
  async onSubmit(form: NgForm) {
    if (form.valid) {
      const user = this.users.find(u => u.username === this.username && u.password === this.password);
      if (user) {
        // Verificar si es un administrador
        if (this.username.includes('@admin')) {
          this.navCtrl.navigateRoot('/admin'); // Redirige a la página de administración
        } else {
          // Si las credenciales son correctas
          const alert = await this.alertCtrl.create({
            header: 'Bienvenido',
            message: '¡Bienvenido a la tienda!',
            buttons: [{
              text: 'Aceptar',
              handler: () => {
                this.navCtrl.navigateRoot('/home'); // Redirige a la página principal
              }
            }]
          });
          await alert.present();
        }
      } else {
        // Si las credenciales son incorrectas
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'Nombre de usuario o contraseña incorrectos.',
          buttons: ['Aceptar']
        });
        await alert.present();
      }
    }
  }
}
