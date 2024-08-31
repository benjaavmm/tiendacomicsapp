import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Superman1Page } from './superman1.page';

describe('Superman1Page', () => {
  let component: Superman1Page;
  let fixture: ComponentFixture<Superman1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Superman1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
