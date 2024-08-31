import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SecretwarsPage } from './secretwars.page';

describe('SecretwarsPage', () => {
  let component: SecretwarsPage;
  let fixture: ComponentFixture<SecretwarsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretwarsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
