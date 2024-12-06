import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { ServicebdService } from '../../services/servicebd.service';
import { Subject } from 'rxjs';

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

  getLogoutEvent() {
    return new Subject();
  }

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

  it('should initialize comics', async () => {
    spyOn(serviceBDSpy, 'insertarComics').and.returnValue(Promise.resolve());
    await component.ngOnInit();
    expect(serviceBDSpy.insertarComics).toHaveBeenCalled();
  });
});
