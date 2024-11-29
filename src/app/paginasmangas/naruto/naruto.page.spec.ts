import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NarutoPage } from './naruto.page';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('NarutoPage', () => {
  let component: NarutoPage;
  let fixture: ComponentFixture<NarutoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        IonicModule.forRoot() // Importar IonicModule
      ],
      declarations: [NarutoPage]
    }).compileComponents();

    fixture = TestBed.createComponent(NarutoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
