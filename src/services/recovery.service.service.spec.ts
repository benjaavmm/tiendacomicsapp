import { TestBed } from '@angular/core/testing';

import { RecoveryServiceService } from './recovery.service.service';

describe('RecoveryServiceService', () => {
  let service: RecoveryServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecoveryServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
