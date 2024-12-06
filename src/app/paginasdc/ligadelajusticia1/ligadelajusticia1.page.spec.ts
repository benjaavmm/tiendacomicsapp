import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from '../../testing.module';
import { Ligadelajusticia1Page } from './ligadelajusticia1.page';

describe('Ligadelajusticia1Page', () => {
  let component: Ligadelajusticia1Page;
  let fixture: ComponentFixture<Ligadelajusticia1Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [Ligadelajusticia1Page]
    }).compileComponents();

    fixture = TestBed.createComponent(Ligadelajusticia1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
