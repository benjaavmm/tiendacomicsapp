import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MangasPage } from './mangas.page';
import { ServicebdService } from '../../services/servicebd.service'; 
import { of } from 'rxjs';

class MockServicebdService {
  getData() {
    return of([]);
  }
}

describe('MangasPage', () => {
  let component: MangasPage;
  let fixture: ComponentFixture<MangasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        IonicModule.forRoot()
      ],
      declarations: [MangasPage],
      providers: [
        { provide: ServicebdService, useClass: MockServicebdService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MangasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
