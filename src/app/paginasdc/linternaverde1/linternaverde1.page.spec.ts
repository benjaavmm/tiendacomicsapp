import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Linternaverde1Page } from './linternaverde1.page';

describe('Linternaverde1Page', () => {
  let component: Linternaverde1Page;
  let fixture: ComponentFixture<Linternaverde1Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        IonicModule.forRoot()
      ],
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
