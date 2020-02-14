import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../../services/http.service';
import { EndPoints } from '../../../services/endpoints.enum';

import {
  ContributorsReq,
  ContributorDetails, CategoryDetails,
  CategoriesRes, SchemeDetails, SchemeRes
} from '../../../models/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data: any;
  contributorDetails: ContributorDetails[];
  catList: CategoryDetails[];
  schemesList: SchemeDetails[];
  constructor(private http: HttpService) {

  }

  ngOnInit() {
    this.getCharityList();
  }

  getContributors($event) {
    const scheme = this.schemesList[$event.element._index];
    const endpoint = `${environment.apiUrl}/${scheme.schemeId}/contributors`;
    this.http.readData(endpoint).subscribe(
      (res: ContributorsReq) => {
        this.contributorDetails = res.contributorDetails;
      }
    );
  }

  getSelect(cat: CategoryDetails, index) {
    this.catList.forEach(
      (element, ind) => {
        if (this.catList[ind].categoryId !== cat.categoryId) {
          this.catList[ind].selected = false;
        }
      });
    this.schemes(cat.categoryId);
  }

  schemes(catId) {
    const data: any[] = [];
    const labels: any[] = [];
    const endpoints = `${environment.apiUrl}/${EndPoints.Categories}/${catId}/schemes`;
    this.http.readData(endpoints).subscribe(
      (res: SchemeRes) => {
        this.schemesList = res.schemeDetails;
        this.schemesList.forEach(element => {
          labels.push(element.schemeName);
          data.push(element.contributors);
        });

        this.data = {
          datasets: [{
            data,
            backgroundColor: [
              '#FF6384',
              '#4BC0C0',
              '#FFCE56',
              '#E7E9ED',
              '#36A2EB'
            ]
          }],
          labels
        };
      });
  }


  getCharityList() {
    const endpoints = `${environment.apiUrl}/${EndPoints.Categories}`;
    this.http.readData(endpoints).subscribe(res => {
      this.catList = res.categoryDetails;
    //  this.catList[0].selected = true;
      this.schemes(this.catList[0].categoryId);
    });
  }


}
