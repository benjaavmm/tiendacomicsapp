import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyheroacademiaPage } from './myheroacademia.page';

describe('MyheroacademiaPage', () => {
  let component: MyheroacademiaPage;
  let fixture: ComponentFixture<MyheroacademiaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        IonicModule.forRoot()
      ],
      declarations: [MyheroacademiaPage]
    }).compileComponents();

    fixture = TestBed.createComponent(MyheroacademiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
