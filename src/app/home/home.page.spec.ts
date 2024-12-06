import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { ServicebdService } from '../../services/servicebd.service';

// Mock completo del servicio
class MockServicebdService {
  insertarComics() {
    return Promise.resolve();
  }
  
  getAllComics() {
    return Promise.resolve([]);
  }
  
  getCurrentUser() {
    return {
      subscribe: (fn: any) => fn(null)
    };
  }

  // Agrega otros métodos que uses en HomePage
  filterComics() {
    return [];
  }
}

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let serviceBDSpy: any;

  beforeEach(async () => {
    serviceBDSpy = new MockServicebdService();
    
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        IonicModule.forRoot(),
        FormsModule
      ],
      providers: [
        { provide: ServicebdService, useValue: serviceBDSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Prueba para inicialización de cómics
  it('should initialize comics', async () => {
    spyOn(serviceBDSpy, 'insertarComics').and.returnValue(Promise.resolve());
    await component.ngOnInit();
    expect(serviceBDSpy.insertarComics).toHaveBeenCalled();
  });
});
