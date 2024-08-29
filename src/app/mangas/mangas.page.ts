import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mangas',
  templateUrl: './mangas.page.html',
  styleUrls: ['./mangas.page.scss'],
})
export class MangasPage {
  comics = [
    {
      title: 'Naruto',
      price: '$11.990',
      image: 'assets/img/naruto.jpg',
    },
    {
      title: 'Demon Slayer',
      price: '$11.990',
      image: 'assets/img/demonslayer.jpg',
    },
    {
      title: 'Dragon Ball',
      price: '$13.990',
      image: 'assets/img/dragonball.jpg',
    },
    {
      title: 'Jujutsu Kaisen',
      price: '$13.990',
      image: 'assets/img/jujutsukaisen.jpg',
    },
    {
      title: 'Tokyo Revengers',
      price: '$12.990',
      image: 'assets/img/tokyorevengers.jpg',
    },
    {
      title: 'My Hero Academia',
      price: '$11.990',
      image: 'assets/img/myheroacademia.jpg',
    },
    {
      title: 'Attack On Titan',
      price: '$12.990',
      image: 'assets/img/atackontitan.jpg',
    },
    {
      title: 'Hunter X Hunter',
      price: '$13.990',
      image: 'assets/img/hxh.jpg',
    },
  ];
}