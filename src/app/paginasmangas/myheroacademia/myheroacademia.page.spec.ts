import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from '../../testing.module';
import { MyheroacademiaPage } from './myheroacademia.page';

describe('MyheroacademiaPage', () => {
  let component: MyheroacademiaPage;
  let fixture: ComponentFixture<MyheroacademiaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [MyheroacademiaPage]
    }).compileComponents();

    fixture = TestBed.createComponent(MyheroacademiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
