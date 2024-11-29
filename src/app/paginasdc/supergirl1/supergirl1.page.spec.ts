import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Supergirl1Page } from './supergirl1.page';

describe('Supergirl1Page', () => {
  let component: Supergirl1Page;
  let fixture: ComponentFixture<Supergirl1Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        IonicModule.forRoot()
      ],
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
