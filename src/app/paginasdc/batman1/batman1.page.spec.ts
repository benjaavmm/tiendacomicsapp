import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from '../../testing.module';
import { Batman1Page } from './batman1.page';

describe('Batman1Page', () => {
  let component: Batman1Page;
  let fixture: ComponentFixture<Batman1Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [Batman1Page]
    }).compileComponents();

    fixture = TestBed.createComponent(Batman1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
