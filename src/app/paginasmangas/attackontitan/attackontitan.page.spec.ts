import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AttackontitanPage } from './attackontitan.page';

describe('AttackontitanPage', () => {
  let component: AttackontitanPage;
  let fixture: ComponentFixture<AttackontitanPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        IonicModule.forRoot()
      ],
      declarations: [AttackontitanPage]
    }).compileComponents();

    fixture = TestBed.createComponent(AttackontitanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
