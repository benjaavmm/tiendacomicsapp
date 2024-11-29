import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ligadelajusticia1Page } from './ligadelajusticia1.page';

describe('Ligadelajusticia1Page', () => {
  let component: Ligadelajusticia1Page;
  let fixture: ComponentFixture<Ligadelajusticia1Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        IonicModule.forRoot()
      ],
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
