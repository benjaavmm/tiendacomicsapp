import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from '../../testing.module';
import { BlackwidowPage } from './blackwidow.page';

describe('BlackwidowPage', () => {
  let component: BlackwidowPage;
  let fixture: ComponentFixture<BlackwidowPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [BlackwidowPage]
    }).compileComponents();

    fixture = TestBed.createComponent(BlackwidowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
