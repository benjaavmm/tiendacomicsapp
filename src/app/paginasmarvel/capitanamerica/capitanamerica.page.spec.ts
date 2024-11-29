import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CapitanamericaPage } from './capitanamerica.page';

describe('CapitanamericaPage', () => {
  let component: CapitanamericaPage;
  let fixture: ComponentFixture<CapitanamericaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        IonicModule.forRoot()
      ],
      declarations: [CapitanamericaPage]
    }).compileComponents();

    fixture = TestBed.createComponent(CapitanamericaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
