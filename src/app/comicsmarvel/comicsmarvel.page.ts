import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-comicsmarvel',
  templateUrl: './comicsmarvel.page.html',
  styleUrls: ['./comicsmarvel.page.scss'],
})
export class ComicsmarvelPage {
  comics = [
    {
      title: 'The Incredible Hulk And Now The Wolverine!',
      price: '$22.990',
      image: 'assets/img/hulk.png',
      link: 'hulk.html'
    },
    {
      title: 'The Amazing Spider-Man',
      price: '$18.990',
      image: 'assets/img/spiderman.jpg',
      link: 'spiderman1.html'
    },
    {
      title: 'The Astonishing Ant-Man',
      price: '$23.990',
      image: 'assets/img/antman.jpg',
      link: 'antman.html'
    },
    {
      title: 'The Avengers: Captain America Lives Again!',
      price: '$22.990',
      image: 'assets/img/capitanamerica.jpg',
      link: 'capitanamerica.html'
    },
    {
      title: 'Marvel Super Heroes: Secret Wars',
      price: '$20.990',
      image: 'assets/img/secretwars.jpg',
      link: 'secretwars.html'
    },
    {
      title: 'The Invincible Iron Man: Cry Revolution!',
      price: '$24.990',
      image: 'assets/img/ironman.jpg',
      link: 'ironman.html'
    },
    {
      title: 'The Mighty Thor: The Wrath Of Odin!',
      price: '$21.990',
      image: 'assets/img/thor.jpg',
      link: 'thor.html'
    },
    {
      title: "Black Widow: Widow's Sting",
      price: '$24.990',
      image: 'assets/img/blackwidow.jpg',
      link: 'blackwidow.html'
    }
  ];
  
  constructor(private menu: MenuController) {}

  openMenu() {
    this.menu.open('first');
  }
  }


