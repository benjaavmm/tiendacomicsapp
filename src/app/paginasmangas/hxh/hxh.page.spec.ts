import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HxhPage } from './hxh.page';

describe('HxhPage', () => {
  let component: HxhPage;
  let fixture: ComponentFixture<HxhPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HxhPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
