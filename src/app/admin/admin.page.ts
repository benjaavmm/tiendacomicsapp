import { Component, OnInit } from '@angular/core';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ServicebdService } from '../../services/servicebd.service';
import { Comic } from '../../services/comic';
import { CompraDetalle } from '../../services/compradetalle';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  comics: Comic[] = [];
  historialCompras: CompraDetalle[] = [];
  segmentValue = 'comics';
  categorias = [
    { id: 1, nombre: 'Marvel' },
    { id: 2, nombre: 'Manga' },
    { id: 3, nombre: 'DC' }
  ];

  comic: Comic = {
    id_comic: 0,
    nombre_comic: '',
    precio: 0,
    stock: 0,
    descripcion: '',
    foto_comic: '',
    id_categoria: 1,
    link: '',
    quantity: 1
  };

  isEdit = false;
  priceError: string = '';
  stockError: string = '';

  constructor(
    private serviceBD: ServicebdService,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    private router: Router 
  ) {}

  ngOnInit() {
    this.loadComics();
    this.loadHistorialCompras();
  }

  async loadComics() {
    this.comics = await this.serviceBD.getAllComics();
  }

  loadHistorialCompras() {
    this.serviceBD.getHistorialComprasAdmin().subscribe(
      compras => {
        this.historialCompras = compras;
      },
      error => {
        this.presentAlert('Error', error);
      }
    );
  }

  async onSubmit() {
    this.priceError = '';
    this.stockError = '';

    // Validaciones
    if (this.comic.precio < 0) {
      this.priceError = 'El precio no puede ser negativo.';
      return;
    }

    if (this.comic.stock < 0 || !Number.isInteger(this.comic.stock)) {
      this.stockError = 'El stock debe ser un número entero no negativo.';
      return;
    }

    if (!this.comic.nombre_comic || !this.comic.precio || !this.comic.stock) {
      await this.presentAlert('Error', 'Por favor complete todos los campos obligatorios.');
      return;
    }

    try {
      if (this.isEdit) {
        await this.serviceBD.updateComic(this.comic);
        await this.presentAlert('Éxito', 'Cómic actualizado correctamente');
      } else {
        await this.serviceBD.addComic(this.comic);
        await this.presentAlert('Éxito', 'Cómic agregado correctamente');
      }
      await this.loadComics();
      this.resetForm();
    } catch (error) {
      await this.presentAlert('Error', 'Error al guardar el cómic: ' + error);
    }
  }

  editComic(comic: Comic) {
    this.isEdit = true;
    this.comic = { ...comic };
    setTimeout(() => {
      const element = document.getElementById('comic-form');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' }); // Desplaza la vista hacia el formulario
      }
    }, 0);
  }

  async confirmDelete(comic: Comic) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: `¿Estás seguro que quieres eliminar '${comic.nombre_comic}'?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: async () => {
            if (comic.id_comic) {
              try {
                const deleted = await this.serviceBD.deleteComic(comic.id_comic);
                if (deleted) {
                  await this.loadComics();
                  await this.presentAlert('Éxito', 'Cómic eliminado correctamente');
                }
              } catch (error) {
                await this.presentAlert('Error', 'Error al eliminar el cómic: ' + error);
              }
            }
          }
        }
      ]
    });
    await alert.present();
  }

  resetForm() {
    this.comic = {
      id_comic: 0,
      nombre_comic: '',
      precio: 0,
      stock: 0,
      descripcion: '',
      foto_comic: '',
      id_categoria: 1,
      link: '',
      quantity: 1
    };
    this.isEdit = false;
    this.priceError = '';
    this.stockError = '';
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Seleccionar Imagen',
      buttons: [
        {
          text: 'Tomar Foto',
          handler: () => {
            this.takePhoto();
          }
        },
        {
          text: 'Elegir de la Galería',
          handler: () => {
            this.selectFromGallery();
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        source: CameraSource.Camera,
        resultType: CameraResultType.Base64
      });

      this.comic.foto_comic = 'data:image/jpeg;base64,' + image.base64String;
    } catch (error) {
      await this.presentAlert('Error', 'Error al tomar la foto: ' + error);
    }
  }

  async selectFromGallery() {
    try {
      const image = await Camera.getPhoto({
        quality: 40,
        source: CameraSource.Photos,
        resultType: CameraResultType.Base64
      });

      this.comic.foto_comic = 'data:image/jpeg;base64,' + image.base64String;
    } catch (error) {
      await this.presentAlert('Error', 'Error al seleccionar la imagen: ' + error);
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  getEstadoVenta(id_estado: number): string {
    switch (id_estado) {
      case 1:
        return 'Pendiente';
      case 2:
        return 'En proceso';
      case 3:
        return 'Completada';
      case 4:
        return 'Cancelada';
      default:
        return 'Desconocido';
    }
  }

  getCategoriaName(id_categoria: number): string {
    const categoria = this.categorias.find(cat => cat.id === id_categoria);
    return categoria ? categoria.nombre : 'Sin categoría';
  }

  logout() {
    this.serviceBD.logout(); 
    this.router.navigate(['/login']); 
  }
}
