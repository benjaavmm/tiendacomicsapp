import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-comicsdc',
  templateUrl: './comicsdc.page.html',
  styleUrls: ['./comicsdc.page.scss'],
})
export class ComicsdcPage {
  comics = [
    {
      title: 'The Flash N°52',
      price: '$21.990',
      image: 'assets/img/flash.jpg',
      link: '/flash1' // Ruta en lugar de enlace HTML
    },
    {
      title: 'Linterna Verde',
      price: '$19.990',
      image: 'assets/img/linternaverde.jpg',
      link: '/linternaverde1'
    },
    {
      title: 'Batman',
      price: '$23.990',
      image: 'assets/img/batman1.jpg',
      link: '/batman1'
    },
    {
      title: 'Aquaman #14: La Marea del Terror',
      price: '$18.890',
      image: 'assets/img/aquaman1.jpg',
      link: '/aquaman1'
    },
    {
      title: 'Liga de la Justicia #27: Legado',
      price: '$20.990',
      image: 'assets/img/ligadelajusticia1.jpg',
      link: '/ligadelajusticia1'
    },
    {
      title: 'Supergirl #3: El Reinado de los Superhombres Cibernéticos',
      price: '$17.000',
      image: 'assets/img/Supergirl.jpg',
      link: '/supergirl1'
    },
    {
      title: 'Superman #264: El Secreto del Mariscal de Campo Fantasma',
      price: '$18.800',
      image: 'assets/img/superman1.jpg',
      link: '/superman1'
    },
    {
      title: 'Jóvenes Titanes #1: El Reinado de los Superhombres Cibernéticos',
      price: '$19.900',
      image: 'assets/img/titans.png',
      link: '/titans1'
    }
  ];
  constructor(private menu: MenuController) {}

  openMenu() {
    this.menu.open('first');
  }
  }
