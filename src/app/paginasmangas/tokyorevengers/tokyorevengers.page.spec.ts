import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from '../../testing.module';
import { TokyorevengersPage } from './tokyorevengers.page';

describe('TokyorevengersPage', () => {
  let component: TokyorevengersPage;
  let fixture: ComponentFixture<TokyorevengersPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [TokyorevengersPage]
    }).compileComponents();

    fixture = TestBed.createComponent(TokyorevengersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
