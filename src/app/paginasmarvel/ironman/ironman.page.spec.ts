import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from '../../testing.module';
import { IronmanPage } from './ironman.page';

describe('IronmanPage', () => {
  let component: IronmanPage;
  let fixture: ComponentFixture<IronmanPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [IronmanPage]
    }).compileComponents();

    fixture = TestBed.createComponent(IronmanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
