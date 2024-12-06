import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from '../../testing.module';
import { AntmanPage } from './antman.page';

describe('AntmanPage', () => {
  let component: AntmanPage;
  let fixture: ComponentFixture<AntmanPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [AntmanPage]
    }).compileComponents();

    fixture = TestBed.createComponent(AntmanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
