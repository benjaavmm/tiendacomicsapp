import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SecretwarsPage } from './secretwars.page';

describe('SecretwarsPage', () => {
  let component: SecretwarsPage;
  let fixture: ComponentFixture<SecretwarsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        IonicModule.forRoot()
      ],
      declarations: [SecretwarsPage]
    }).compileComponents();

    fixture = TestBed.createComponent(SecretwarsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
