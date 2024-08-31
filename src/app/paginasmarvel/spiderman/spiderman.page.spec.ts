import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpidermanPage } from './spiderman.page';

describe('SpidermanPage', () => {
  let component: SpidermanPage;
  let fixture: ComponentFixture<SpidermanPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SpidermanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
