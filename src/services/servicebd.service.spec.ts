import { TestBed } from '@angular/core/testing';
import { ServicebdService } from './servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { TestingModule } from '../app/testing.module';

describe('ServicebdService', () => {
  let service: ServicebdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [
        ServicebdService,
        {
          provide: SQLite,
          useValue: {
            create: () => Promise.resolve({
              executeSql: () => Promise.resolve({ 
                rows: { 
                  length: 0, 
                  item: () => ({}),
                  items: () => []
                }
              })
            })
          }
        },
        {
          provide: Platform,
          useValue: {
            ready: () => Promise.resolve(),
            is: () => true
          }
        }
      ]
    });
    service = TestBed.inject(ServicebdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
