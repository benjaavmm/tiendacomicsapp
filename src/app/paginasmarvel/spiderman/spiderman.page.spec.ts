import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpidermanPage } from './spiderman.page';

describe('SpidermanPage', () => {
  let component: SpidermanPage;
  let fixture: ComponentFixture<SpidermanPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        IonicModule.forRoot()
      ],
      declarations: [SpidermanPage]
    }).compileComponents();

    fixture = TestBed.createComponent(SpidermanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
