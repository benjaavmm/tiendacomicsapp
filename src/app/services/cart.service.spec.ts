import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { TestingModule } from '../testing.module';
import { ServicebdService } from '../../services/servicebd.service';
import { of, Subject } from 'rxjs';

describe('CartService', () => {
  let service: CartService;
  let mockServiceBD: Partial<ServicebdService>;

  beforeEach(() => {
    mockServiceBD = {
      dbState: () => of(true),
      getComicsByCategoria: () => Promise.resolve([]),
      insertarComics: () => Promise.resolve(),
      getCurrentUser: () => of(null),
      getLogoutEvent: () => new Subject() // Agregamos el método faltante
    };

    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [
        CartService,
        { provide: ServicebdService, useValue: mockServiceBD }
      ]
    });
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
