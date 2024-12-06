import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComicsmarvelPage } from './comicsmarvel.page';
import { TestingModule } from '../testing.module';
import { ServicebdService } from '../../services/servicebd.service';
import { of, Subject } from 'rxjs';

describe('ComicsmarvelPage', () => {
  let component: ComicsmarvelPage;
  let fixture: ComponentFixture<ComicsmarvelPage>;
  let mockServiceBD: Partial<ServicebdService>;

  beforeEach(async () => {
    mockServiceBD = {
      dbState: () => of(true),
      getComicsByCategoria: () => Promise.resolve([]),
      insertarComics: () => Promise.resolve(),
      getCurrentUser: () => of(null),
      getLogoutEvent: () => new Subject()
    };

    await TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [ComicsmarvelPage],
      providers: [
        { provide: ServicebdService, useValue: mockServiceBD }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ComicsmarvelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
