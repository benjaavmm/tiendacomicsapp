import { Component, OnInit } from '@angular/core';

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
      link: 'flash1.html'
    },
    {
      title: 'Linterna Verde',
      price: '$19.990',
      image: 'assets/img/linternaverde.jpg',
      link: 'linternaverde1.html'
    },
    {
      title: 'Batman',
      price: '$23.990',
      image: 'assets/img/batman1.jpg',
      link: 'batman1.html'
    },
    {
      title: 'Aquaman #14: La Marea del Terror',
      price: '$18.890',
      image: 'assets/img/aquaman1.jpg',
      link: 'Aquaman.html'
    },
    {
      title: 'Liga de la Justicia #27: Legado',
      price: '$20.990',
      image: 'assets/img/ligadelajusticia1.jpg',
      link: 'ligadelajusticia.html'
    },
    {
      title: 'Supergirl #3: El Reinado de los Superhombres Cibernéticos',
      price: '$17.000',
      image: 'assets/img/Supergirl.jpg',
      link: 'supergirl.html'
    },
    {
      title: 'Superman #264: El Secreto del Mariscal de Campo Fantasma',
      price: '$18.800',
      image: 'assets/img/superman1.jpg',
      link: 'superman.html'
    },
    {
      title: 'Jovenes Titanes #1: El Reinado de los Superhombres Cibernéticos',
      price: '$19.900',
      image: 'assets/img/titans.png',
      link: 'titans.html'
    }
  ];
}
