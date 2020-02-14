import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { PrimengModule } from '../../../shared/primeng/primeng.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EndPoints } from '../../../services/endpoints.enum';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '../../../services/http.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

fdescribe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let api: HttpService;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  const mockUserService = {
    modalConfig: () => ({
      message: '',
      modalShow: ''
    }),
    readData(specilization: string) {
      return of({
        statusCode: 200,
        categoryDetails: [
          {
            categoryId: 1,
            categoryName: 'NON-NGO'
          }
        ]
      });
    },
    bookAppointment(data: object) {
      return of({
        statusCode: 200,
        message: 'success'
      });
    },
    getSlots(doctorId: number) {
      return of({
        statusCode: 200,
        message: 'Slots retrieved successfully',
        slotDetails:
          [{
            slotName: 'Rabeek',
            status: 'Available'
          }]
      });
    }
  };
  // create new instance of FormBuilder
  const formBuilder: FormBuilder = new FormBuilder();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [SharedModule, PrimengModule, BrowserAnimationsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: HttpService, useValue: mockUserService
        },
        { provide: FormBuilder, useValue: formBuilder },
        {
          provide: Router, useValue: mockRouter
        }
      ]
    })
      .compileComponents();
    api = TestBed.get(HttpService);
    mockRouter = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should invoke category api', () => {
    component.getCharityList();
    expect(api.readData('url')).toBeTruthy();
  });
});
