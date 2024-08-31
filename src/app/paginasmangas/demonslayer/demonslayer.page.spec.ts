import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemonslayerPage } from './demonslayer.page';

describe('DemonslayerPage', () => {
  let component: DemonslayerPage;
  let fixture: ComponentFixture<DemonslayerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DemonslayerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
