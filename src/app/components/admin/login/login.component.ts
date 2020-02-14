import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { Router } from '@angular/router';
import { LoginReq, LoginRes } from '../../../models/models';
import { environment } from 'src/environments/environment';
import { EndPoints } from '../../../services/endpoints.enum';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private http: HttpService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      mobileNumber: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }
  validateUser() {
    const endpoint = `${environment.logUrl}/${EndPoints.login}`;
    this.http.createData(endpoint, this.loginForm.value).subscribe(
      (res: LoginRes) => {
        if (res.statusCode === 200) {
          sessionStorage.setItem('currentUser', JSON.stringify(res));
          this.router.navigate(['/admin/dashboard']);
        }
      }
    );
  }

}
