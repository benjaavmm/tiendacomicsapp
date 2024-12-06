import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from '../../testing.module';
import { SecretwarsPage } from './secretwars.page';

describe('SecretwarsPage', () => {
  let component: SecretwarsPage;
  let fixture: ComponentFixture<SecretwarsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [SecretwarsPage]
    }).compileComponents();

    fixture = TestBed.createComponent(SecretwarsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
