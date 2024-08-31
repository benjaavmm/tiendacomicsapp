import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Flash1Page } from './flash1.page';

describe('Flash1Page', () => {
  let component: Flash1Page;
  let fixture: ComponentFixture<Flash1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Flash1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
