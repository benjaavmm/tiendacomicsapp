import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { ServicebdService } from 'src/services/servicebd.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  // Propiedades que almacenan los valores del formulario
  rut: string = '';
  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  telefono: string = '';
  direccion: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';
  foto_usuario: any="";
  id_rol= "1";
  fotoIngresada: boolean = false;

  // Inyección de dependencias para control de alertas y navegación
  constructor(private alertCtrl: AlertController, private navCtrl: NavController, private formBuilder: FormBuilder, private db: ServicebdService, public router:Router,private toastController: ToastController) {}

  // Método que se ejecuta al enviar el formulario
  async onSubmit(form: NgForm) {
    if (form.valid) {
      // Verifica que las contraseñas coincidan
      if (this.contrasena !== this.confirmarContrasena) {
        await this.presentAlert('Error', 'Las contraseñas no coinciden.');
        return;
      }

      // Valida la complejidad de la contraseña
      const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
      if (!passwordPattern.test(this.contrasena)) {
        await this.presentAlert('Error', 'La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.');
        return;
      }


      // Valida el formato del correo electrónico
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.correo)) {
        await this.presentAlert('Error', 'Por favor, ingresa un correo electrónico válido.');
        return;
      }

      // Verifica que el nombre no contenga números
      if (/\d/.test(this.nombre)) {
        await this.presentAlert('Error', 'El nombre no debe contener números.');
        return;
      }

      // Verifica que el apellido no contenga números
      if (/\d/.test(this.apellido)) {
        await this.presentAlert('Error', 'El apellido no debe contener números.');
        return;
      }

      // Valida el formato del teléfono
      const phonePattern = /^\+?[0-9\s]+$/;
      if (!phonePattern.test(this.telefono)) {
        await this.presentAlert('Error', 'El teléfono solo puede contener números y el símbolo +.');
        return;
      }

      // Si todas las validaciones pasan, muestra un mensaje de éxito
      const alert = await this.alertCtrl.create({
        header: 'Registro Exitoso',
        message: 'Tu cuenta ha sido creada exitosamente.',
        buttons: [{
          text: 'Aceptar',
          handler: () => {
            this.navCtrl.navigateRoot('/login'); // Redirige a la página de login
          }
        }]
      });
      await alert.present();
    } else {
      // Si hay campos obligatorios sin completar, muestra un mensaje de error
      await this.presentAlert('Error', 'Por favor, completa todos los campos obligatorios.');
    }
  }

  // Método para mostrar alertas
  private async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  // Método para manejar la selección de archivos
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.foto_usuario = file;
    }
  }


  async crear(registroForm: NgForm){
    if (registroForm.valid && this.foto_usuario) {
    this.db.crearUsuario(this.rut, this.nombre, this.apellido, this.foto_usuario, this.direccion,this.correo, this.telefono, this.contrasena, this.id_rol);
    this.router.navigate(['/login']);
    } else {
      const toast = await this.toastController.create({
        message: 'Verifique los datos ingresados nuevamente.',
        duration: 3000, // Duración en milisegundos
        color: 'danger' // Color del Toast
      });
      toast.present();
  
    }
  }



  ngOnInit() {
  }

  takePicture = async () => {
    const image2 = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl, 
      source:CameraSource.Prompt
    });
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    this.foto_usuario = image2.dataUrl;
    this.fotoIngresada = true;

  };

}


