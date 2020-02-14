import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../../services/http.service';
import { environment} from 'src/environments/environment';
import { EndPoints } from '../../../services/endpoints.enum';
import Swal from 'sweetalert2';
import { from } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
loader = false;
charityList;
  constructor(
    private router: Router,
    public donateService: HttpService) { }

    getCharityList() {
      this.loader = true;
      const endpoints = `${environment.apiUrl}/${EndPoints.userDetails}` ;
      this.donateService.readData(endpoints).subscribe(res => {
        console.log(res);
        this.loader = false;
        this.charityList = res.categoryDetails;
      },
        error => {
          this.loader = false;
        });
    }

    goToSchemes(val) {
      this.router.navigate(['/donate/schemes'], { queryParams: { categoryId: val } });
    }

  ngOnInit() {
  }

}
