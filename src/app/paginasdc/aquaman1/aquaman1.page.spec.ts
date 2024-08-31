import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Aquaman1Page } from './aquaman1.page';

describe('Aquaman1Page', () => {
  let component: Aquaman1Page;
  let fixture: ComponentFixture<Aquaman1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Aquaman1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
