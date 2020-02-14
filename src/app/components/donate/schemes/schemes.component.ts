import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../services/http.service';
import { environment} from 'src/environments/environment';
import { EndPoints } from '../../../services/endpoints.enum';
import { SchemeRes, SchemeDetails } from '../../../models/models';
import Swal from 'sweetalert2';
import { from } from 'rxjs';

@Component({
  selector: 'app-schemes',
  templateUrl: './schemes.component.html',
  styleUrls: ['./schemes.component.css']
})
export class SchemesComponent implements OnInit {
  loader = false;
  categoryId: number;
  schemesList: SchemeDetails[];
  constructor(
    private router: Router,
    private routeNavigate: ActivatedRoute,
    public donateService: HttpService) { }

    getCharityList(catId) {
      this.loader = true;
      const endpoints = `${environment.apiUrl}/${EndPoints.Categories}/${catId}/schemes`;
      this.donateService.readData(endpoints).subscribe(res => {
        console.log(res);
        this.loader = false;
        this.schemesList = res.schemeDetails;
      },
        error => {
          this.loader = false;
        });
    }

    donateFund(scheme: number) {
      this.router.navigate(['/donate/payment'], { queryParams: { schemeId: scheme } });
    }

  ngOnInit() {
    this.routeNavigate.queryParams.subscribe(params => {
      this.categoryId = params.categoryId;
    });
    this.getCharityList(this.categoryId);
  }

}
