import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarContrasenaPage } from './modificarcontrasena.page';
import { ServicebdService } from '../../services/servicebd.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

// Mock para SQLite
class MockSQLite {}

class MockServicebdService {
  getCurrentUser() {
    return of({ id_usuario: 1 }); // Simular un usuario actual
  }
  validateCurrentPassword(userId: number, password: string) {
    return Promise.resolve(true); // Simular validación de contraseña actual
  }
  updatePassword(userId: number, newPassword: string) {
    return Promise.resolve(); // Simular actualización de contraseña
  }
}

describe('ModificarContrasenaPage', () => {
  let component: ModificarContrasenaPage;
  let fixture: ComponentFixture<ModificarContrasenaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificarContrasenaPage],
      imports: [FormsModule], // Asegúrate de importar FormsModule
      providers: [
        { provide: ServicebdService, useClass: MockServicebdService },
        { provide: SQLite, useClass: MockSQLite }, // Proveer mock de SQLite
        AlertController
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarContrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
