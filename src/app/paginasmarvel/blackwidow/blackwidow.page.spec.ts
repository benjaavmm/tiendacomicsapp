import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlackwidowPage } from './blackwidow.page';

describe('BlackwidowPage', () => {
  let component: BlackwidowPage;
  let fixture: ComponentFixture<BlackwidowPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BlackwidowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
