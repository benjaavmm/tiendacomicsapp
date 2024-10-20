import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage {
  comics: Array<{ title: string; price: number; image: string; link: string; quantity: number }> = [
    // Mangas
    {
      title: 'Naruto',
      price: 11990, 
      image: 'assets/img/naruto.jpg',
      link: '/naruto',
      quantity: 1
    },
    {
      title: 'Demon Slayer',
      price: 11990, 
      image: 'assets/img/demonslayer.jpg',
      link: '/demonslayer',
      quantity: 1
    },
    {
      title: 'Dragon Ball #12: El Desafío de Goku y Vegeta',
      price: 13990, 
      image: 'assets/img/dragonball.jpg',
      link: '/dragonball',
      quantity: 1
    },
    {
      title: 'Jujutsu Kaisen',
      price: 13990,
      image: 'assets/img/jujutsukaisen.jpg',
      link: '/jujutsukaisen',
      quantity: 1
    },
    {
      title: 'Tokyo Revengers',
      price: 12990, 
      image: 'assets/img/tokyorevengers.jpg',
      link: '/tokyorevengers',
      quantity: 1
    },
    {
      title: 'My Hero Academia',
      price: 13990, 
      image: 'assets/img/myheroacademia.jpg',
      link: '/myheroacademia',
      quantity: 1
    },
    {
      title: 'Attack On Titan',
      price: 12990, 
      image: 'assets/img/atackontitan.jpg',
      link: '/attackontitan',
      quantity: 1
    },
    {
      title: 'Hunter X Hunter',
      price: 13990, 
      image: 'assets/img/hxh.jpg',
      link: '/hxh',
      quantity: 1
    },

    // Comics de DC
    {
      title: 'The Flash N°52',
      price: 21990, 
      image: 'assets/img/flash.jpg',
      link: '/flash1',
      quantity: 1
    },
    {
      title: 'Green Lantern: Tales of the Sinestro Corps',
      price: 19990, 
      image: 'assets/img/linternaverde.jpg',
      link: '/linternaverde1',
      quantity: 1
    },
    {
      title: 'Detective Comics #400: El Desafío del Hombre Murciélago',
      price: 23990, 
      image: 'assets/img/batman1.jpg',
      link: '/batman1',
      quantity: 1
    },
    {
      title: 'Aquaman #14: La Marea del Terror',
      price: 18890, 
      image: 'assets/img/aquaman1.jpg',
      link: '/aquaman1',
      quantity: 1
    },
    {
      title: 'Liga De La Justicia #27: Legado',
      price: 20890, 
      image: 'assets/img/ligadelajusticia1.jpg',
      link: '/ligadelajusticia1',
      quantity: 1
    },
    {
      title: 'Supergirl #3: El Reinado de los Superhombres Cibernéticos',
      price: 17000, 
      image: 'assets/img/Supergirl.jpg',
      link: '/supergirl1',
      quantity: 1
    },
    {
      title: 'Superman #264: El Secreto del Mariscal de Campo Fantasma',
      price: 18800, 
      image: 'assets/img/superman1.jpg',
      link: '/superman1',
      quantity: 1
    },
    {
      title: 'Jóvenes Titanes #1: El Reinado de los Superhombres Cibernéticos',
      price: 19900, 
      image: 'assets/img/titans.png',
      link: '/titans1',
      quantity: 1
    },

    // Comics de Marvel
    {
      title: 'The Incredible Hulk And Now The Wolverine!',
      price: 22990, 
      image: 'assets/img/hulk.png',
      link: '/hulk',
      quantity: 1
    },
    {
      title: 'The Amazing Spider-Man',
      price: 18990, 
      image: 'assets/img/spiderman.jpg',
      link: '/spiderman',
      quantity: 1
    },
    {
      title: 'The Astonishing Ant-Man',
      price: 23990, 
      image: 'assets/img/antman.jpg',
      link: '/antman',
      quantity: 1
    },
    {
      title: 'The Avengers: Captain America Lives Again!',
      price: 22990, 
      image: 'assets/img/capitanamerica.jpg',
      link: '/capitanamerica',
      quantity: 1
    },
    {
      title: 'Marvel Super Heroes: Secret Wars',
      price: 20990, 
      image: 'assets/img/secretwars.jpg',
      link: '/secretwars',
      quantity: 1
    },
    {
      title: 'The Invincible Iron Man: Cry Revolution!',
      price: 24990, 
      image: 'assets/img/ironman.jpg',
      link: '/ironman',
      quantity: 1
    },
    {
      title: 'The Mighty Thor: The Wrath Of Odin!',
      price: 21990, 
      image: 'assets/img/thor.jpg',
      link: '/thor',
      quantity: 1
    },
    {
      title: "Black Widow: Widow's Sting",
      price: 24990, 
      image: 'assets/img/blackwidow.jpg',
      link: '/blackwidow',
      quantity: 1
    }
  ];



comic = {
  title: '',
  price: 0,
  image: '',
  link: '',
  quantity: 1
};

isEdit = false;
priceError: string = '';

constructor(private alertController: AlertController) {}

// Método para agregar o actualizar un cómic
onSubmit(form: any) {
  this.priceError = '';

  if (this.comic.price < 0) {
    this.priceError = 'El precio no puede ser negativo.';
    return;
  }

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
editComic(comic: { title: string; price: number; image: string; link: string; quantity: number }) {
  this.isEdit = true;
  this.comic = { ...comic };
}

// Método para mostrar la confirmación de eliminación
async confirmDelete(comic: { title: string; price: number; image: string; link: string; quantity: number }) {
  const alert = await this.alertController.create({
    header: 'Confirmar Eliminación',
    message: `¿Estás seguro que quieres eliminar '${comic.title}'?`,
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Cancelado');
        }
      },
      {
        text: 'Eliminar',
        handler: () => {
          this.deleteComic(comic);
        }
      }
    ]
  });

  await alert.present();
}

// Método para eliminar un cómic
deleteComic(comic: { title: string; price: number; image: string; link: string; quantity: number }) {
  this.comics = this.comics.filter(c => c !== comic);
}

// Método para reiniciar el formulario
resetForm() {
  this.comic = {
    title: '',
    price: 0,
    image: '',
    link: '',
    quantity: 1
  };
  this.isEdit = false;
}
}