import { TestBed } from '@angular/core/testing';
import { RecoveryService } from './recovery.service.service'; // Corrige la importación si es necesario
import { ServicebdService } from './servicebd.service'; // Asegúrate de importar tu servicio
import { of } from 'rxjs';

// Mock para cualquier servicio del que dependa RecoveryService
class MockServicebdService {
  getCurrentUser() {
    return of({}); // Simular un usuario actual
  }
}

describe('RecoveryService', () => {
  let service: RecoveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RecoveryService,
        { provide: ServicebdService, useClass: MockServicebdService } // Proveedor simulado
      ]
    });
    service = TestBed.inject(RecoveryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Agrega más pruebas según sea necesario
});
