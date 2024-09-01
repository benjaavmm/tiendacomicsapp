import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperaclavePage } from './recuperaclave.page';

describe('RecuperaclavePage', () => {
  let component: RecuperaclavePage;
  let fixture: ComponentFixture<RecuperaclavePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperaclavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
