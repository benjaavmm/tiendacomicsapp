import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IronmanPage } from './ironman.page';

describe('IronmanPage', () => {
  let component: IronmanPage;
  let fixture: ComponentFixture<IronmanPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IronmanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
