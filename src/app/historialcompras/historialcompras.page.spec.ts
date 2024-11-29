import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HistorialComprasPage } from './historialcompras.page';
import { ServicebdService } from '../../services/servicebd.service'; 
import { of } from 'rxjs';

class MockServicebdService {
  getData() {
    return of([]);
  }
}

describe('HistorialComprasPage', () => {
  let component: HistorialComprasPage;
  let fixture: ComponentFixture<HistorialComprasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        IonicModule.forRoot()
      ],
      declarations: [HistorialComprasPage],
      providers: [
        { provide: ServicebdService, useClass: MockServicebdService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HistorialComprasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
