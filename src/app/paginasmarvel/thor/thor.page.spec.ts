import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThorPage } from './thor.page';

describe('ThorPage', () => {
  let component: ThorPage;
  let fixture: ComponentFixture<ThorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ThorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
