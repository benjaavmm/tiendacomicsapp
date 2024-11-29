import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TokyorevengersPage } from './tokyorevengers.page';

describe('TokyorevengersPage', () => {
  let component: TokyorevengersPage;
  let fixture: ComponentFixture<TokyorevengersPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        IonicModule.forRoot()
      ],
      declarations: [TokyorevengersPage]
    }).compileComponents();

    fixture = TestBed.createComponent(TokyorevengersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
