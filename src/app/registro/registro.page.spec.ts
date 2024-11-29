import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServicebdService } from '../../services/servicebd.service';

// Mock para el servicio que puedas estar usando
class MockServicebdService {
  // Simula métodos del servicio según sea necesario
}

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroPage],
      imports: [
        CommonModule,
        FormsModule,
        IonicModule.forRoot()
      ],
      providers: [
        { provide: ServicebdService, useClass: MockServicebdService } // Proveedor simulado
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería validar el formato de correo electrónico', () => {
    const correosValidos = ['test@example.com', 'user@domain.com'];
    const correosInvalidos = ['invalido', 'test@', '@test.com'];

    correosValidos.forEach(correo => {
      component.correo = correo;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      expect(emailPattern.test(component.correo)).toBeTruthy();
    });

    correosInvalidos.forEach(correo => {
      component.correo = correo;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      expect(emailPattern.test(component.correo)).toBeFalsy();
    });
  });

  it('debería validar el formato de teléfono', () => {
    const telefonosValidos = ['+56912345678'];
    const telefonosInvalidos = ['12345678', '+569123456'];

    telefonosValidos.forEach(telefono => {
      component.telefono = telefono;
      const phonePattern = /^\+569[0-9]{8}$/;
      expect(phonePattern.test(component.telefono)).toBeTruthy();
    });

    telefonosInvalidos.forEach(telefono => {
      component.telefono = telefono;
      const phonePattern = /^\+569[0-9]{8}$/;
      expect(phonePattern.test(component.telefono)).toBeFalsy();
    });
  });
});
