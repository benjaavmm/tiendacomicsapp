import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JujutsukaisenPage } from './jujutsukaisen.page';

describe('JujutsukaisenPage', () => {
  let component: JujutsukaisenPage;
  let fixture: ComponentFixture<JujutsukaisenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JujutsukaisenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
