import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlackwidowPage } from './blackwidow.page';

describe('BlackwidowPage', () => {
  let component: BlackwidowPage;
  let fixture: ComponentFixture<BlackwidowPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        IonicModule.forRoot()
      ],
      declarations: [BlackwidowPage]
    }).compileComponents();

    fixture = TestBed.createComponent(BlackwidowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
