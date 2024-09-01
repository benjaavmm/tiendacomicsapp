import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-recuperaclave',
  templateUrl: './recuperaclave.page.html',
  styleUrls: ['./recuperaclave.page.scss'],
})
export class RecuperaclavePage {
  email: string = ''; 

  constructor() { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Instrucciones enviadas a:', this.email);
      alert('Instrucciones enviadas a ' + this.email);
      form.reset();
    }
  }
}
