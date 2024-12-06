import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from '../../testing.module';
import { Supergirl1Page } from './supergirl1.page';

describe('Supergirl1Page', () => {
  let component: Supergirl1Page;
  let fixture: ComponentFixture<Supergirl1Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [Supergirl1Page]
    }).compileComponents();

    fixture = TestBed.createComponent(Supergirl1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
