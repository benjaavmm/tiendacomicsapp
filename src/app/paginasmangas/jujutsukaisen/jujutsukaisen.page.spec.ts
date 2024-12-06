import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from '../../testing.module';
import { JujutsukaisenPage } from './jujutsukaisen.page';

describe('JujutsukaisenPage', () => {
  let component: JujutsukaisenPage;
  let fixture: ComponentFixture<JujutsukaisenPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [JujutsukaisenPage]
    }).compileComponents();

    fixture = TestBed.createComponent(JujutsukaisenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
