import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  // Inicializa las propiedades
  username: string = '';
  password: string = '';

  constructor() {}

  // Método onSubmit
  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Formulario enviado:', form.value);
      // Aquí puedes agregar la lógica para manejar el inicio de sesión
    }
  }
}
