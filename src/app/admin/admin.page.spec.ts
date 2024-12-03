import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminPage } from './admin.page';
import { ServicebdService } from '../../services/servicebd.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AlertController, ActionSheetController, IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { RouterTestingModule } from '@angular/router/testing';

// Mock para SQLite
class MockSQLite {}

class MockServicebdService {
  getHistorialComprasAdmin() {
    return of([]); 
  }
  getCurrentUser() {
    return of({}); 
  }
  getAllComics() {
    return Promise.resolve([]); 
  }
  updateComic(comic: any) {
    return Promise.resolve(); 
  }
  addComic(comic: any) {
    return Promise.resolve(); 
  }
  deleteComic(id: number) {
    return Promise.resolve(); 
  }
  logout() {
    return Promise.resolve();
  }
}

describe('AdminPage', () => {
  let component: AdminPage;
  let fixture: ComponentFixture<AdminPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminPage],
      imports: [
        FormsModule,
        IonicModule.forRoot(),
        RouterTestingModule
      ],
      providers: [
        { provide: ServicebdService, useClass: MockServicebdService },
        { provide: SQLite, useClass: MockSQLite },
        AlertController,
        ActionSheetController
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPage);
    component = fixture.componentInstance;
    // Inicializar las propiedades necesarias
    component.comics = [];
    component.historialCompras = [];
    component.segmentValue = 'comics';
    component.comic = {
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
