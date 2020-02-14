import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { PrimengModule } from '../../../shared/primeng/primeng.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '../../../services/http.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let api: HttpService;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  const mockUserService = {
    isValidUser: false,
    setValidUser: (flag: boolean) => { mockUserService.isValidUser = flag; },
    currentUser: {
      statusCode: 200,
      adminName: 'Rabeek',
    },
    validUser: () => mockUserService.isValidUser,
    loggedUser: () => {
      return mockUserService.currentUser;
    },
    modalConfig: () => ({
      message: '',
      modalShow: ''
    }),
    createData(data: object) {
      return of({
        statusCode: 200,
      adminName: 'Rabeek'
      });
    }
  };
  // create new instance of FormBuilder
  const formBuilder: FormBuilder = new FormBuilder();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
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
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should check ngOnInit Valid User and form creation', () => {
    component.ngOnInit();
    component.loginForm = new FormGroup({
      mobileNumber: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    expect(component.loginForm.valid).toBeFalsy();
  });
  it('it shoud validate logged in user', () => {
    const response = {
      statusCode: 200,
      adminName: 'Rabeek'
    };
    const postObj = {
      mobileNumber: component.loginForm.controls.mobileNumber.setValue('987654321'),
      password: component.loginForm.controls.password.setValue('12345')
    };
    component.validateUser();
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const endpoints = `http://localhost:4200/donate/Categories`;
    expect(api.createData(postObj, endpoints)).toBeTruthy();
    expect(currentUser).toEqual(response);
  });
});