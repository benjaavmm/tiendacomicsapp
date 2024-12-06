import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminPage } from './admin.page';
import { ServicebdService } from '../../services/servicebd.service';
import { of, Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AlertController, ActionSheetController, IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { RouterTestingModule } from '@angular/router/testing';

class MockSQLite {}

class MockServicebdService {
  comicsUpdated = new Subject<void>(); // Añadido el Subject para comicsUpdated

  getHistorialComprasAdmin() {
    return of([]);
  }

  getAllComicsAdmin() {
    return Promise.resolve([]);
  }

  getCurrentUser() {
    return of({ id: 1, email: 'test@test.com' });
  }

  updateComic() {
    return Promise.resolve();
  }

  addComic() {
    return Promise.resolve();
  }

  deleteComic() {
    return Promise.resolve(true);
  }

  logout() {
    return Promise.resolve();
  }
}

describe('AdminPage', () => {
  let component: AdminPage;
  let fixture: ComponentFixture<AdminPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminPage],
      imports: [
        FormsModule,
        IonicModule.forRoot(),
        RouterTestingModule
      ],
      providers: [
        { provide: ServicebdService, useClass: MockServicebdService },
        { provide: SQLite, useClass: MockSQLite },
        AlertController,
        ActionSheetController
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
