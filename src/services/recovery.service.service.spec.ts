import { TestBed } from '@angular/core/testing';

import { RecoveryService } from './recovery.service.service';

describe('RecoveryServiceService', () => {
  let service: RecoveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecoveryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
