import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MangasPage } from './mangas.page';
import { TestingModule } from '../testing.module';
import { ServicebdService } from '../../services/servicebd.service';
import { of } from 'rxjs';

describe('MangasPage', () => {
  let component: MangasPage;
  let fixture: ComponentFixture<MangasPage>;
  let mockServiceBD: Partial<ServicebdService>;

  beforeEach(async () => {
    mockServiceBD = {
      dbState: () => of(true),
      getComicsByCategoria: () => Promise.resolve([]),
      insertarComics: () => Promise.resolve(),
      getCurrentUser: () => of(null)
    };

    await TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [MangasPage],
      providers: [
        { provide: ServicebdService, useValue: mockServiceBD }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MangasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
