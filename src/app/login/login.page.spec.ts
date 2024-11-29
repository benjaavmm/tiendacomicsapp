import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from '../../services/servicebd.service'; 
import { NavController } from '@ionic/angular';

// Mock para NavController
class NavControllerMock {
  navigateRoot(path: string) {}
}

// Mock para AlertController
class AlertControllerMock {
  create() {
    return {
      present: () => Promise.resolve(),
      onDidDismiss: () => Promise.resolve()
    };
  }
}

// Mock para ServicebdService
class MockServicebdService {
  validateCredentials() {
    return of(true); // Simular validación de credenciales
  }
}

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule.forRoot(),
        FormsModule
      ],
      providers: [
        { provide: NavController, useClass: NavControllerMock },
        { provide: AlertController, useClass: AlertControllerMock },
        { provide: ServicebdService, useClass: MockServicebdService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Prueba: Validar campos vacíos
  it('debería validar que los campos no estén vacíos', () => {
    component.username = '';
    component.password = '';
    expect(component.username.trim()).toBe('');
    expect(component.password.trim()).toBe('');
  });

  // Prueba: Validar formato de correo
  it('debería validar formato de correo electrónico', () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    component.username = 'test@example.com';
    expect(emailPattern.test(component.username)).toBeTruthy();

    component.username = 'invalid-email';
    expect(emailPattern.test(component.username)).toBeFalsy();
  });

  // Prueba: Validar longitud mínima de contraseña
  it('debería validar longitud mínima de contraseña', () => {
    const minLength = 6;

    component.password = '12345';
    expect(component.password.length >= minLength).toBeFalsy();

    component.password = '123456';
    expect(component.password.length >= minLength).toBeTruthy();
  });

  // Prueba: Validar credenciales de administrador
  it('debería validar credenciales de administrador', async () => {
    const alertSpy = spyOn(AlertControllerMock.prototype, 'create').and.callThrough();

    component.username = 'admin@admin.com';
    component.password = 'Admin+123';

    const formMock = {
      valid: true,
      controls: {
        username: { valid: true },
        password: { valid: true }
      }
    };

    await component.onSubmit(formMock as any);

    expect(alertSpy).toHaveBeenCalled();
  });

  // Prueba: Validar que los campos no contengan solo espacios
  it('debería validar que los campos no contengan solo espacios', () => {
    component.username = '   ';
    component.password = '   ';
    expect(component.username.trim()).toBe('');
    expect(component.password.trim()).toBe('');
  });
});
function of(arg0: boolean) {
  throw new Error('Function not implemented.');
}

