import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from '../../testing.module';
import { ThorPage } from './thor.page';

describe('ThorPage', () => {
  let component: ThorPage;
  let fixture: ComponentFixture<ThorPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [ThorPage]
    }).compileComponents();

    fixture = TestBed.createComponent(ThorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
