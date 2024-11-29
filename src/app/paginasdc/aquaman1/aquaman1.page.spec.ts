import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Aquaman1Page } from './aquaman1.page';
import { CartService } from '../../services/cart.service'; 

describe('Aquaman1Page', () => {
  let component: Aquaman1Page;
  let fixture: ComponentFixture<Aquaman1Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        IonicModule.forRoot()
      ],
      declarations: [Aquaman1Page],
      providers: [
        { provide: CartService, useValue: {} } // Mock el servicio si es necesario
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Aquaman1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
