import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemesComponent } from './schemes.component';
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

describe('SchemesComponent', () => {
  let component: SchemesComponent;
  let fixture: ComponentFixture<SchemesComponent>;
  let api: HttpService;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  const mockUserService = {
    modalConfig: () => ({
      message: '',
      modalShow: ''
    }),
    readData() {
      return of({
        statusCode: 200,
        schemeDetails:
          [{
            schemeId: 1,
            schemeName: 'Test',
            amount: 100,
            description: 'Testing',
            contributors: 1,
            taxBenefit: '12%'
          }]
      });
    }
  };
  const formBuilder: FormBuilder = new FormBuilder();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SchemesComponent],
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
    fixture = TestBed.createComponent(SchemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should navigate to scheme page', () => {
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/donate/payment']);
    expect(component).toBeTruthy();
  });

  it('should check ngOnInit', () => {
    component.ngOnInit();
    component.getCharityList(12);
  });
  it('should return categories', () => {
    component.getCharityList(12);
    component.loader = true;
    const endpoints = `http://localhost:4200/donate/Categories/1/schemes`;
    expect(api.readData(endpoints)).toBeTruthy();
    expect(component.loader).toBeFalsy();
  });
});
