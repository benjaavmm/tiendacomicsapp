import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  comics = [
    {
      title: 'The Flash N°52',
      price: '$21.990',
      image: 'assets/img/flash.jpg',
    },
    {
      title: 'Green Lantern: Tales of the Sinestro Corps',
      price: '$19.990',
      image: 'assets/img/linternaverde.jpg',
    },
    {
      title: 'Batman',
      price: '$23.990',
      image: 'assets/img/batman1.jpg',
    },
    {
      title: 'Dragon Ball',
      price: '$13.990',
      image: 'assets/img/dragonball.jpg',
    },
    {
      title: 'Demon Slayer',
      price: '$11.990',
      image: 'assets/img/demonslayer.jpg',
    },
    {
      title: 'Batman Beyond',
      price: '$21.990',
      image: 'assets/img/batman2.jpg',
    },
    {
      title: 'naruto',
      price: '$11.990',
      image: 'assets/img/naruto.jpg',
    },
    {
      title: 'The Amazing Spiderman',
      price: '$18.990',
      image: 'assets/img/spiderman.jpg',
    },
  ];

  constructor() {}
}
