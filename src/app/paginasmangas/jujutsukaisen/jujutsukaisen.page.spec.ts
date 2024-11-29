import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JujutsukaisenPage } from './jujutsukaisen.page';

describe('JujutsukaisenPage', () => {
  let component: JujutsukaisenPage;
  let fixture: ComponentFixture<JujutsukaisenPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        IonicModule.forRoot()
      ],
      declarations: [JujutsukaisenPage]
    }).compileComponents();

    fixture = TestBed.createComponent(JujutsukaisenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
