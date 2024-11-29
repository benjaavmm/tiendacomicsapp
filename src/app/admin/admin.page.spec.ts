import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminPage } from './admin.page';
import { ServicebdService } from '../../services/servicebd.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

// Mock para SQLite
class MockSQLite {}

class MockServicebdService {
  getHistorialComprasAdmin() {
    return of([]); // Simular respuesta del historial de compras
  }
  getCurrentUser() {
    return of({}); // Simular un usuario actual
  }
  getAllComics() {
    return Promise.resolve([]); // Simular respuesta de todos los cómics
  }
  updateComic(comic: any) {
    return Promise.resolve(); // Simular actualización de cómic
  }
  addComic(comic: any) {
    return Promise.resolve(); // Simular adición de cómic
  }
  deleteComic(id: number) {
    return Promise.resolve(); // Simular eliminación de cómic
  }
}

describe('AdminPage', () => {
  let component: AdminPage;
  let fixture: ComponentFixture<AdminPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminPage],
      imports: [FormsModule], // Asegúrate de importar FormsModule
      providers: [
        { provide: ServicebdService, useClass: MockServicebdService },
        { provide: SQLite, useClass: MockSQLite }, // Proveer mock de SQLite
        AlertController,
        ActionSheetController
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
