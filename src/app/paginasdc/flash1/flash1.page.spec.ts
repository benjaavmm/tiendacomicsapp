import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from '../../testing.module';
import { Flash1Page } from './flash1.page';

describe('Flash1Page', () => {
  let component: Flash1Page;
  let fixture: ComponentFixture<Flash1Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [Flash1Page]
    }).compileComponents();

    fixture = TestBed.createComponent(Flash1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
