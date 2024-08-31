import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TokyorevengersPage } from './tokyorevengers.page';

describe('TokyorevengersPage', () => {
  let component: TokyorevengersPage;
  let fixture: ComponentFixture<TokyorevengersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TokyorevengersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
