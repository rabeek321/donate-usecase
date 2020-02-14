import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentComponent } from './payment.component';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { PrimengModule } from '../../../shared/primeng/primeng.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '../../../services/http.service';
import { environment } from 'src/environments/environment';
import { EndPoints } from '../../../services/endpoints.enum';
import { CategoriesRes, CategoryDetails } from '../../../models/models';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { of } from 'rxjs';
describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;
  let api: HttpService;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  const mockUserService = {
    modalConfig: () => ({
      message: '',
      modalShow: ''
    }),
    createData() {
      return of({
        statusCode: 200,
        donationId: 1
      });
    }
  };
  const formBuilder: FormBuilder = new FormBuilder();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentComponent],
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
    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should check ngOnInit Valid User and form creation', () => {
    component.ngOnInit();
    this.paymentForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      panNumber: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
      paytype: ['', Validators.required]
    });
    expect(component.paymentForm.valid).toBeFalsy();
  });

  it('should submit new appointment', () => {
    const postObj = {
      userName: component.paymentForm.value.username.setValue('rabeek'),
      email: component.paymentForm.value.email.setValue('rabeek114@gmail.com'),
      mobileNo: component.paymentForm.value.mobileNumber.setValue('9876543210'),
      panNo: component.paymentForm.value.panNumber.setValue('987654321234'),
      paymentType: component.paymentForm.value.paytype.setValue('PhonePe'),
      schemeId: 1
    };
    const endpoints = `http://localhost:4200/donate/donations`;
    component.submitPayment();
    expect(api.createData(endpoints, postObj)).toBeTruthy();
    expect(component.loader).toBeFalsy();
  });
});
