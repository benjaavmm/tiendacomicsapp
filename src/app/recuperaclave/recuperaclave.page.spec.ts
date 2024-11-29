import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperaclavePage } from './recuperaclave.page';
import { ServicebdService } from '../../services/servicebd.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

class MockServicebdService {
  recoverPassword() {
    return of(true);
  }
}

describe('RecuperaclavePage', () => {
  let component: RecuperaclavePage;
  let fixture: ComponentFixture<RecuperaclavePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecuperaclavePage],
      imports: [FormsModule],
      providers: [
        { provide: ServicebdService, useClass: MockServicebdService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RecuperaclavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
