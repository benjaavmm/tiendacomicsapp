import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CapitanamericaPage } from './capitanamerica.page';

describe('CapitanamericaPage', () => {
  let component: CapitanamericaPage;
  let fixture: ComponentFixture<CapitanamericaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CapitanamericaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
