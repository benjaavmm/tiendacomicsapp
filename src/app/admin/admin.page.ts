import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage {
  comics: Array<{ title: string; price: number; image: string; link: string }> = [
    {
      title: 'The Flash N°52',
      price: 21990,
      image: 'assets/img/flash.jpg',
      link: '/flash1'
    },
    {
      title: 'Linterna Verde',
      price: 19990,
      image: 'assets/img/linternaverde.jpg',
      link: '/linternaverde1'
    },
    {
      title: 'Batman',
      price: 23990,
      image: 'assets/img/batman1.jpg',
      link: '/batman1'
    }
  ];

  comic = {
    title: '',
    price: 0,
    image: '',
    link: ''
  };

  isEdit = false;

  // Método para agregar o actualizar un cómic
  onSubmit(form: any) {
    if (this.isEdit) {
      const index = this.comics.findIndex(c => c.title === this.comic.title);
      if (index !== -1) {
        this.comics[index] = { ...this.comic };
      }
    } else {
      this.comics.push({ ...this.comic });
    }
    this.resetForm();
  }

  // Método para editar un cómic
  editComic(comic: { title: string; price: number; image: string; link: string }) {
    this.isEdit = true;
    this.comic = { ...comic };
  }

  // Método para eliminar un cómic
  deleteComic(comic: { title: string; price: number; image: string; link: string }) {
    this.comics = this.comics.filter(c => c !== comic);
  }

  // Método para reiniciar el formulario
  resetForm() {
    this.comic = {
      title: '',
      price: 0,
      image: '',
      link: ''
    };
    this.isEdit = false;
  }
}
