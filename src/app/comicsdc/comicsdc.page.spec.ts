import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComicsdcPage } from './comicsdc.page';
import { ServicebdService } from '../../services/servicebd.service'; 
import { of } from 'rxjs';

class MockServicebdService {
  getData() {
    return of([]);
  }
}

describe('ComicsdcPage', () => {
  let component: ComicsdcPage;
  let fixture: ComponentFixture<ComicsdcPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        IonicModule.forRoot()
      ],
      declarations: [ComicsdcPage],
      providers: [
        { provide: ServicebdService, useClass: MockServicebdService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ComicsdcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
