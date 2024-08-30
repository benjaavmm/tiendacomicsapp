import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComicsmarvelPage } from './comicsmarvel.page';

describe('ComicsmarvelPage', () => {
  let component: ComicsmarvelPage;
  let fixture: ComponentFixture<ComicsmarvelPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicsmarvelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
