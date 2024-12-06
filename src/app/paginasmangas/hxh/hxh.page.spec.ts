import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from '../../testing.module';
import { HxhPage } from './hxh.page';

describe('HxhPage', () => {
  let component: HxhPage;
  let fixture: ComponentFixture<HxhPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [HxhPage]
    }).compileComponents();

    fixture = TestBed.createComponent(HxhPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
