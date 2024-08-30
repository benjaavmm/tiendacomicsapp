import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComicsdcPage } from './comicsdc.page';

describe('ComicsdcPage', () => {
  let component: ComicsdcPage;
  let fixture: ComponentFixture<ComicsdcPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicsdcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
