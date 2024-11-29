import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarperfilPage } from './modificarperfil.page';
import { ServicebdService } from '../../services/servicebd.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

class MockServicebdService {
  getCurrentUser() {
    return of({}); // Simular un usuario actual
  }
  updateProfile() {
    return of(true); // Simular una actualización de perfil exitosa
  }
}

describe('ModificarperfilPage', () => {
  let component: ModificarperfilPage;
  let fixture: ComponentFixture<ModificarperfilPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificarperfilPage],
      imports: [FormsModule],
      providers: [
        { provide: ServicebdService, useClass: MockServicebdService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarperfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
