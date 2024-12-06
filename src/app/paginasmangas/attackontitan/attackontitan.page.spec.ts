import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from '../../testing.module';
import { AttackontitanPage } from './attackontitan.page';

describe('AttackontitanPage', () => {
  let component: AttackontitanPage;
  let fixture: ComponentFixture<AttackontitanPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [AttackontitanPage]
    }).compileComponents();

    fixture = TestBed.createComponent(AttackontitanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
