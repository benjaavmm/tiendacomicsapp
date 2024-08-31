import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HulkPage } from './hulk.page';

describe('HulkPage', () => {
  let component: HulkPage;
  let fixture: ComponentFixture<HulkPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HulkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
