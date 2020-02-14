import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../services/http.service';
import { environment } from 'src/environments/environment';
import { EndPoints } from '../../../services/endpoints.enum';
import { CategoriesRes, CategoryDetails } from '../../../models/models';
import Swal from 'sweetalert2';
import { from } from 'rxjs';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  loader: false;
  schemeId: number;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private routeNavigate: ActivatedRoute,
    public donateService: HttpService
  ) { }

  /*
  * @param
  * Get login form controll access
  */
 get payment() { return this.paymentForm.controls; }

 submitPayment() {
  if (this.paymentForm.valid) {
    const postObj = {
      userName: this.paymentForm.value.username,
      email: this.paymentForm.value.email,
      mobileNo: this.paymentForm.value.mobileNumber,
      panNo: this.paymentForm.value.panNumber,
      // paymentType: this.paymentForm.value.paytype,
      schemeId: this.schemeId
    };
    const endpoints = `${environment.apiUrl}/${EndPoints.donations}`;
    this.donateService.createData(endpoints, postObj).subscribe(res => {
      console.log(res);
      this.loader = false;
      Swal.fire({
        text: 'You have successfully made your payment through' + this.paymentForm.value.paytype,
        // tslint:disable-next-line: max-line-length
        imageUrl: 'https://cdn4.vectorstock.com/i/1000x1000/82/03/cash-paid-rubber-stamp-vector-12438203.jpg',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image'
      });
    },
      error => {
        this.loader = false;
      });
  }
 }

  ngOnInit() {
    this.routeNavigate.queryParams.subscribe(params => {
      this.schemeId = params.schemeId;
    });
    this.createForm();
  }

  /*
   * @param create form
   * Create form group object for login form
   */
  createForm() {
    this.paymentForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      panNumber: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
      paytype: ['', Validators.required]
    });
  }

}
