import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Supergirl1Page } from './supergirl1.page';

describe('Supergirl1Page', () => {
  let component: Supergirl1Page;
  let fixture: ComponentFixture<Supergirl1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Supergirl1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
