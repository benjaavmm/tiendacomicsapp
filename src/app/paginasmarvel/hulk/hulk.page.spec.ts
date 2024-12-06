import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from '../../testing.module';
import { HulkPage } from './hulk.page';

describe('HulkPage', () => {
  let component: HulkPage;
  let fixture: ComponentFixture<HulkPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [HulkPage]
    }).compileComponents();

    fixture = TestBed.createComponent(HulkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
