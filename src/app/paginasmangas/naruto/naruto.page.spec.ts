import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from '../../testing.module';
import { NarutoPage } from './naruto.page';

describe('NarutoPage', () => {
  let component: NarutoPage;
  let fixture: ComponentFixture<NarutoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [NarutoPage]
    }).compileComponents();

    fixture = TestBed.createComponent(NarutoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
