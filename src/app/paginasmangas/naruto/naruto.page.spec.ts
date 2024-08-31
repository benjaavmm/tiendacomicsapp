import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NarutoPage } from './naruto.page';

describe('NarutoPage', () => {
  let component: NarutoPage;
  let fixture: ComponentFixture<NarutoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NarutoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
