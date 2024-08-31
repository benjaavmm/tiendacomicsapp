import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AntmanPage } from './antman.page';

describe('AntmanPage', () => {
  let component: AntmanPage;
  let fixture: ComponentFixture<AntmanPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AntmanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
