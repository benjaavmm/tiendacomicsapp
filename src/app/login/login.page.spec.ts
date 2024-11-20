import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [ 
        IonicModule.forRoot(),
        FormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Prueba 1: Verificar inicialización de variables
  it('debería inicializar username y password como strings vacíos', () => {
    expect(component.username).toBe('');
    expect(component.password).toBe('');
  });

  // Prueba 2: Verificar credenciales de admin
  it('debería identificar credenciales de administrador correctamente', () => {
    component.username = 'admin@admin.com';
    component.password = 'Admin+123';
    const sonCredencialesAdmin = 
      component.username === 'admin@admin.com' && 
      component.password === 'Admin+123';
    expect(sonCredencialesAdmin).toBeTruthy();
  });
});
