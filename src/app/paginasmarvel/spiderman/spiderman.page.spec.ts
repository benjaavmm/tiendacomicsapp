import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from '../../testing.module';
import { SpidermanPage } from './spiderman.page';

describe('SpidermanPage', () => {
  let component: SpidermanPage;
  let fixture: ComponentFixture<SpidermanPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [SpidermanPage]
    }).compileComponents();

    fixture = TestBed.createComponent(SpidermanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
