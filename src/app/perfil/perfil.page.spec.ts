import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilPage } from './perfil.page';
import { ServicebdService } from '../../services/servicebd.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

class MockServicebdService {
  getCurrentUser() {
    return of({}); // Simular respuesta del usuario actual
  }
}

describe('PerfilPage', () => {
  let component: PerfilPage;
  let fixture: ComponentFixture<PerfilPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilPage],
      imports: [FormsModule],
      providers: [
        { provide: ServicebdService, useClass: MockServicebdService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
