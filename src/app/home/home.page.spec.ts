import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { of } from 'rxjs'; 
import { ServicebdService } from '../../services/servicebd.service'; 

// Mock para el servicio que puedas estar usando
class MockServicebdService {
  // Simula métodos del servicio según sea necesario
  getSomeData() {
    return of([]); // Simular datos que pueda devolver el servicio
  }
}

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ServicebdService, useClass: MockServicebdService } // Proveedor simulado
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Agrega más pruebas según sea necesario
});
