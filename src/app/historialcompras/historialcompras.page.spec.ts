import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialCompraPage } from './historialcompras.page';

describe('HistorialCompraPage', () => {
  let component: HistorialCompraPage;
  let fixture: ComponentFixture<HistorialCompraPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistorialCompraPage]
    }).compileComponents();

    fixture = TestBed.createComponent(HistorialCompraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
