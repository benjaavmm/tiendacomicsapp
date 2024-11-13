import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialComprasPage } from './historialcompras.page';

describe('HistorialComprasPage', () => {
  let component: HistorialComprasPage;
  let fixture: ComponentFixture<HistorialComprasPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistorialComprasPage]
    }).compileComponents();

    fixture = TestBed.createComponent(HistorialComprasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
