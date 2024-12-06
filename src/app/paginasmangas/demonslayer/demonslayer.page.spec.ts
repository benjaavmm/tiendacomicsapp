import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from '../../testing.module';
import { DemonslayerPage } from './demonslayer.page';

describe('DemonslayerPage', () => {
  let component: DemonslayerPage;
  let fixture: ComponentFixture<DemonslayerPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [DemonslayerPage]
    }).compileComponents();

    fixture = TestBed.createComponent(DemonslayerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
