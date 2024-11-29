import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DemonslayerPage } from './demonslayer.page';

describe('DemonslayerPage', () => {
  let component: DemonslayerPage;
  let fixture: ComponentFixture<DemonslayerPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        IonicModule.forRoot()
      ],
      declarations: [DemonslayerPage]
    }).compileComponents();

    fixture = TestBed.createComponent(DemonslayerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
