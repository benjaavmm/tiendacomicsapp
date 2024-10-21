import { Component, OnInit } from '@angular/core';
import { ServicebdService } from 'src/services/servicebd.service';
import { Usuario } from 'src/services/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verificar',
  templateUrl: './verificar.page.html',
  styleUrls: ['./verificar.page.scss'],
})
export class VerificarPage implements OnInit {

  usuarios: Usuario[] = [];

  constructor(private servicebdService: ServicebdService, private Router: Router) {}

  ngOnInit() {
    this.servicebdService.fetchUsuario().subscribe((data: Usuario[]) => {
        console.log('Usuarios obtenidos:', data); // Log para verificar
        this.usuarios = data;
    });
}

}