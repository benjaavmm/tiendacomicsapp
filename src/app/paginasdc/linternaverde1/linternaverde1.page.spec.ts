import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from '../../testing.module';
import { Linternaverde1Page } from './linternaverde1.page';

describe('Linternaverde1Page', () => {
  let component: Linternaverde1Page;
  let fixture: ComponentFixture<Linternaverde1Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [Linternaverde1Page]
    }).compileComponents();

    fixture = TestBed.createComponent(Linternaverde1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
