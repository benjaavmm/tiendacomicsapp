import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  // Inicializa las propiedades
  username: string = '';
  password: string = '';

  constructor() {}

  // Método onSubmit
  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Formulario enviado:', form.value);
      // Aquí puedes agregar la lógica para manejar el registro
    }
  }
}
