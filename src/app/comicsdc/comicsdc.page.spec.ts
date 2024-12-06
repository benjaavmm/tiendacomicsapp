import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TestingModule } from '../testing.module';
import { ServicebdService } from '../../services/servicebd.service';
import { CartService } from '../services/cart.service';
import { ComicsdcPage } from './comicsdc.page';
import { of } from 'rxjs';

describe('ComicsdcPage', () => {
  let component: ComicsdcPage;
  let fixture: ComponentFixture<ComicsdcPage>;
  let mockServiceBD: Partial<ServicebdService>;

  beforeEach(async () => {
    mockServiceBD = {
      dbState: () => of(true), // Ahora devuelve un Observable<boolean>
      getComicsByCategoria: () => Promise.resolve([]),
      insertarComics: () => Promise.resolve(),
      getCurrentUser: () => of(null) // Ahora devuelve un Observable<Usuario | null>
    };

    await TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [ComicsdcPage],
      providers: [
        CartService,
        { provide: ServicebdService, useValue: mockServiceBD }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ComicsdcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
