import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Titans1Page } from './titans1.page';

describe('Titans1Page', () => {
  let component: Titans1Page;
  let fixture: ComponentFixture<Titans1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Titans1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
