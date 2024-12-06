import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from '../../testing.module';
import { CapitanamericaPage } from './capitanamerica.page';

describe('CapitanamericaPage', () => {
  let component: CapitanamericaPage;
  let fixture: ComponentFixture<CapitanamericaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [CapitanamericaPage]
    }).compileComponents();

    fixture = TestBed.createComponent(CapitanamericaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
