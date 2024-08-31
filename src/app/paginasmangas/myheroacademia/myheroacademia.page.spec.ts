import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyheroacademiaPage } from './myheroacademia.page';

describe('MyheroacademiaPage', () => {
  let component: MyheroacademiaPage;
  let fixture: ComponentFixture<MyheroacademiaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyheroacademiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
