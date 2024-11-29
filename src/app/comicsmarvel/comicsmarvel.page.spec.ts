import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComicsmarvelPage } from './comicsmarvel.page';
import { ServicebdService } from '../../services/servicebd.service';
import { of } from 'rxjs';

class MockServicebdService {
  getData() {
    return of([]);
  }
}

describe('ComicsmarvelPage', () => {
  let component: ComicsmarvelPage;
  let fixture: ComponentFixture<ComicsmarvelPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        IonicModule.forRoot()
      ],
      declarations: [ComicsmarvelPage],
      providers: [
        { provide: ServicebdService, useClass: MockServicebdService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ComicsmarvelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
