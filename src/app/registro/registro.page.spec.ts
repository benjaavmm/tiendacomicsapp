import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroPage ],
      imports: [ 
        IonicModule.forRoot(),
        FormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Prueba 1: Validación del formato de correo electrónico
  it('debería validar el formato de correo electrónico', () => {
    
    const correosValidos = [
      'test@example.com',
      'user.name@domain.com',
      'user123@subdomain.domain.cl'
    ];

    // Casos de prueba con correos inválidos
    const correosInvalidos = [
      'correosinvalido',
      'correo@',
      '@dominio.com',
      'correo@dominio.',
      'correo sin@espacios.com'
    ];

    // Prueba correos válidos
    correosValidos.forEach(correo => {
      component.correo = correo;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      expect(emailPattern.test(component.correo)).toBeTruthy(
        `El correo ${correo} debería ser válido`
      );
    });

    // Prueba correos inválidos
    correosInvalidos.forEach(correo => {
      component.correo = correo;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      expect(emailPattern.test(component.correo)).toBeFalsy(
        `El correo ${correo} debería ser inválido`
      );
    });
  });

  // Prueba 2: Validación del formato de teléfono
  it('debería validar el formato de teléfono chileno', () => {
    // Casos de prueba con teléfonos válidos
    const telefonosValidos = [
      '+56912345678',
      '+56987654321',
      '+56999999999'
    ];

    // Casos de prueba con teléfonos inválidos
    const telefonosInvalidos = [
      '912345678',
      '+5691234567',  
      '+569123456789', 
      '+56812345678',  
      '56912345678',   
      '+569abcdefgh'   
    ];

    // Prueba teléfonos válidos
    telefonosValidos.forEach(telefono => {
      component.telefono = telefono;
      const phonePattern = /^\+569[0-9]{8}$/;
      expect(phonePattern.test(component.telefono)).toBeTruthy(
        `El teléfono ${telefono} debería ser válido`
      );
    });

    // Prueba teléfonos inválidos
    telefonosInvalidos.forEach(telefono => {
      component.telefono = telefono;
      const phonePattern = /^\+569[0-9]{8}$/;
      expect(phonePattern.test(component.telefono)).toBeFalsy(
        `El teléfono ${telefono} debería ser inválido`
      );
    });
  });
});
